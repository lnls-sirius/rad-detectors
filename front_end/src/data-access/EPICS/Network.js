/**
 * Network Object - Create a connection with the epics2web service
 */

class Network {
    constructor() {
        if (!Network.instance) {
            Network.instance = this;
        }
        this.secure = window.location.protocol === 'https:';
        this.epics2webHost = '10.0.38.46';
        this.epics2webLocation = '/epics2web';
        this.epics2webGet = this.secure ? 'https://' : 'http://' + this.epics2webHost + this.epics2webLocation + '/caget';
        this.epics2webWs =
            this.secure ? 'wss://' : 'ws://' + this.epics2webHost + this.epics2webLocation + '/monitor';
            console.log(this.epics2webWs)
        this.epics2webOptions = {
            url: this.epics2webWs,
            autoOpen: true,
            autoReconnect: true,
            autoLivenessPingAndTimeout: true,
            autoDisplayClasses: true,
            pingIntervalMillis: 3000,
            livenessTimoutMillis: 2000,
            reconnectWaitMillis: 1000,
            chunkedRequestPvsCount: 400
        };

        return Network.instance;
    }
}

const instance = new Network();
Object.freeze(instance);

export { instance as network };
