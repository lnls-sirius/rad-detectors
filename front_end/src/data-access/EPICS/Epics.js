import { jlab } from './epics2web';
import { network } from './Network';

/**
 * EPICS Class - Allows communication with EPICS PVs
 *
 * @param {string[]} monitoredPVsList - List of all monitored PVs
 * @param {ClientConnection} con - EPICS Connection
 * @param {{[key: string]: string|number}} pvData - Data of the monitored PVs
 */

class Epics {
    constructor(monitoredPVsList) {
        this.monitoredPVsList = monitoredPVsList;

        this.con = jlab.createClientConnection(network.epics2webOptions);

        this.pvData = {}
        this.monitoredPVsList.forEach(element => {
            this.pvData[element] = { date: null, value: null, datatype: null, count: null };
        });

        /**
         * Open EPICS connection
         */
        this.con.onopen = (e) => {
            // console.log('Socket Connected');
            this.con.monitorPvs(this.monitoredPVsList);
        };

        /**
         * Update values on EPICS update
         */
        this.con.onupdate = (e) => {
            // console.log('PV: ', e.detail.pv, e.detail.date, e.detail.value);
            this.pvData[e.detail.pv].date = e.detail.date;
            this.pvData[e.detail.pv].value = e.detail.value;
        };

        /**
         * Save values on EPICS info
         */
        this.con.oninfo = (e) => {
            // console.log('Info: ', e.detail);
            this.pvData[e.detail.pv].datatype = e.detail.datatype;
            this.pvData[e.detail.pv].count = e.detail.count;
            this.pvData[e.detail.pv].date = e.detail.date;

            if (typeof e.detail['enum-labels'] !== 'undefined') {
                console.log('Enum Labels: ' + e.detail['enum-labels']);
            }
        };
    }

    /**
     * Disconnect EPICS
     */
    disconnect = () => {
        if (this.con) {
            this.con.autoReconnect = false;
            this.con.close();
            this.monitoredPVsList = [];
        }
    }
}
export default Epics;
