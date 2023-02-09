
/* BEGIN IE CustomEvent POLYFILL */
(function () {
    if (typeof window.CustomEvent === "function") {
        return false;
    }

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
/* END IE CustomEvent POLYFILL */

class ClientConnection {
    constructor(options) {
        options = (!options) ? {} : options;

        let protocol = (window.location.protocol === 'https:') ? 'wss:' : 'ws:';

        let defaultOptions = {
            url: protocol + "//" + window.location.host + "/epics2web/monitor",
            autoOpen: true, /* Will automatically connect to socket immediately instead of waiting for open function to be called */
            autoReconnect: true, /* If socket is closed, will automatically reconnect after reconnectWaitMillis */
            autoLivenessPingAndTimeout: true, /* Will ping the server every pingIntervalMillis and if no response in livenessTimeoutMillis then will close the socket as invalid */
            autoDisplayClasses: true, /* As connect state changes will hide and show elements with corresponding state classes: ws-disconnected, ws-connecting, ws-connected */
            pingIntervalMillis: 3000, /* Time to wait between pings */
            livenessTimoutMillis: 2000, /* Max time allowed for server to respond to a ping (via any message) */
            reconnectWaitMillis: 1000, /* Time to wait after socket closed before attempting reconnect */
            chunkedRequestPvsCount: 400, /* Max number of PVs to transmit in a chunked monitor or clear command; 0 to disable chunking */
            clientName: window.location.href /* Client name is a string used for informational/debugging purposes (appears in console) */
        };

        for (let key in defaultOptions) {
            if (typeof options[key] !== 'undefined') {
                this[key] = options[key];
            } else {
                this[key] = defaultOptions[key];
            }
        }


        // Private variables
        this.socket = null;
        this.eventElem = document.createElement('div');
        this.lastUpdated = null;
        this.livenessTimer = null;
        this.reconnecting = false;

        // Private functions
        var doPingWithTimer = () =>{
            /*console.log('pingWithTimer');*/
            if (this.socket !== null && this.socket.readyState === WebSocket.OPEN) {
                this.ping();

                if (this.livenessTimer !== null) {
                    /*console.log('pingWithTimer triggered while liveness timer running (keepAliveTimeout > keepAliveInterval)?');*/
                } else {
                    this.livenessTimer = setTimeout(function () {
                        /*console.log('server liveness timer triggered');*/

                        /*var elapsedMillis = Math.abs(new Date() - lastUpdated);

                         console.log('Elapsed Millis: ' + elapsedMillis);
                         console.log('Keepalive Timeout Millis: ' + self.livenessTimoutMillis);

                         if(elapsedMillis > self.livenessTimoutMillis) {
                         console.log('Ping/Pong Timeout');*/
                        if (this.socket.readyState === WebSocket.OPEN) {
                            this.socket.close();
                        }
                        //}

                        this.livenessTimer = null;
                    }, this.livenessTimoutMillis);
                }
            } else {
                /*console.log('socket is not open: onclose may try to reconnect after a delay if not already reconnecting');*/
            }
        };

        // Event wiring
        this.eventElem.addEventListener('open',       (event) => { this.onopen(event); });
        this.eventElem.addEventListener('close',      (event) => { this.onclose(event); });
        this.eventElem.addEventListener('connecting', (event) => { this.onconnecting(event); });
        this.eventElem.addEventListener('closing',    (event) => { this.onclosing(event); });
        this.eventElem.addEventListener('error',      (event) => { this.onerror(event); });
        this.eventElem.addEventListener('message',    (event) => { this.onmessage(event); });
        this.eventElem.addEventListener('info',       (event) => { this.oninfo(event); });
        this.eventElem.addEventListener('update',     (event) => { this.onupdate(event); });
        this.eventElem.addEventListener('pong',       (event) => { this.onpong(event); });

        this.addEventListener = this.eventElem.addEventListener.bind(this.eventElem);
        this.removeEventListener = this.eventElem.removeEventListener.bind(this.eventElem);
        this.dispatchEvent = this.eventElem.dispatchEvent.bind(this.eventElem);

        // Public functions
        this.open = () => {
            if (this.socket === null || this.socket.readyState === WebSocket.CLOSED) {
                var event = new CustomEvent('connecting');
                this.eventElem.dispatchEvent(event);

                let u = this.url;

                if (this.clientName !== null) {
                    u = u + '?clientName=' + encodeURIComponent(this.clientName);
                }

                this.socket = new WebSocket(u);

                this.socket.onerror = (event) => {
                    console.log("server connection error", event);

                    var evt = new CustomEvent('error');
                    this.eventElem.dispatchEvent(evt);
                };

                this.socket.onclose = (event) => {
                    console.log("server connection closed");
                    // console.log(event.reason);

                    var evt = new CustomEvent('close');
                    this.eventElem.dispatchEvent(evt);

                    if (this.livenessTimer !== null) {
                        clearTimeout(this.livenessTimer);
                        this.livenessTimer = null;
                    }

                    var isClosed = this.socket === null || this.socket.readyState === WebSocket.CLOSED;
                    if (this.autoReconnect && !this.reconnecting && isClosed) {
                        console.log('attempting to reconnect after delay');
                        this.reconnecting = true;
                        setTimeout(() => {
                            console.log('reconnect timer triggered');
                            this.open();
                            this.reconnecting = false;
                        }, this.reconnectWaitMillis);
                    } else {
                        console.log('socket is not closed (socket is connecting, closing, or reconnecting / delayed connecting)');
                    }
                };

                this.socket.onmessage = (event) => {
                    // console.log('on message', event.data);

                    if (this.livenessTimer !== null) {
                        clearTimeout(this.livenessTimer);
                        this.livenessTimer = null;
                    }

                    this.lastUpdated = new Date();
                    var json = JSON.parse(event.data);
                    json.date = this.lastUpdated;
                    if (json.type === 'update') {
                        this.eventElem.dispatchEvent(new CustomEvent('update', { 'detail': json }));
                    } else if (json.type === 'info') {
                        this.eventElem.dispatchEvent(new CustomEvent('info', { 'detail': json }));
                    } else if (json.type === 'pong') {
                        this.eventElem.dispatchEvent(new CustomEvent('pong'));
                    }

                    this.eventElem.dispatchEvent(new CustomEvent('message'), { 'detail': json });
                };

                this.socket.onopen = (event) => {
                    console.log('server connection open');
                    this.lastUpdated = new Date();

                    var evt = new CustomEvent('open');
                    this.eventElem.dispatchEvent(evt);
                };
            } else {
                console.log('already connected');
                return 1;
            }
        };

        this.close = (code, reason) => {
            console.log('close');
            if (this.socket !== null && this.socket.readyState !== WebSocket.CLOSED) {
                if (typeof code === 'undefined') {
                    code = 1000;
                }
                this.socket.close(code, reason);
            } else {
                console.log('already closed');
            }
        };

        this.monitorPvs = (pvs) => {
            if (this.chunkedRequestPvsCount > 0) {
                var i, j, chunk;
                for (i = 0, j = pvs.length; i < j; i += this.chunkedRequestPvsCount) {
                    chunk = pvs.slice(i, i + this.chunkedRequestPvsCount);
                    this.monitorPvsChunk(chunk);
                }
            } else {
                this.monitorPvsChunk(pvs);
            }
        };

        this.monitorPvsChunk = (pvs) => {
            var msg = { type: 'monitor', pvs: pvs };
            this.socket.send(JSON.stringify(msg));
        };

        this.clearPvs = (pvs) => {
            if (this.chunkedRequestPvsCount > 0) {
                var i, j, chunk;
                for (i = 0, j = pvs.length; i < j; i += this.chunkedRequestPvsCount) {
                    chunk = pvs.slice(i, i + this.chunkedRequestPvsCount);
                    this.clearPvsChunk(chunk);
                }
            } else {
                this.clearPvsChunk(pvs);
            }
        };

        this.clearPvsChunk = (pvs) => {
            var msg = { type: 'clear', pvs: pvs };
            this.socket.send(JSON.stringify(msg));
        };

        this.ping = () => {
            var msg = { type: 'ping' };
            this.socket.send(JSON.stringify(msg));
        };

        if (this.autoDisplayClasses === true) {
            this.eventElem.addEventListener('connecting', (event) =>{
                console.log('connecting');
            });
            this.eventElem.addEventListener('open', (event) =>{
                console.log('open');
            });
            this.eventElem.addEventListener('close', (event) =>{
                console.log('close');
            });
        }

        if (this.autoOpen === true) {
            this.open();
        }

        if (this.autoLivenessPingAndTimeout === true) {
            window.setInterval(doPingWithTimer, this.pingIntervalMillis);
        }
    }

}

ClientConnection.prototype.onopen = function () { };
ClientConnection.prototype.onclose = function () { };
ClientConnection.prototype.onconnecting = function () { };
ClientConnection.prototype.onclosing = function () { };
ClientConnection.prototype.onmessage = function () { };
ClientConnection.prototype.onerror = function () { };
ClientConnection.prototype.onupdate = function () { };
ClientConnection.prototype.oninfo = function () { };
ClientConnection.prototype.onpong = function () { };

class Jlab {
    constructor() {
        if (!Jlab.instance) {
            Jlab.instance = this;
            this.epics2web = {};
            // this.contextPrefix = '';
        }
    }

    createClientConnection = (options)=> { return new ClientConnection(options) };

}

const jlab = new Jlab();

jlab.epics2web.isNumericEpicsType = function (datatype) {
    var isNumeric;

    switch (datatype) {
        case 'DBR_DOUBLE':
        case 'DBR_FLOAT':
        case 'DBR_INT':
        case 'DBR_SHORT':
        case 'DBR_BYTE':
            isNumeric = true;
            break;
        default:
            isNumeric = false;
    }

    return isNumeric;
};

export { jlab };
