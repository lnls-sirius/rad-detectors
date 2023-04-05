/**
 * Stores information about the alert and alarms.
 *
 * @param alert_list - Store names of the detectors with alerts flag
 * @param alarm_list - Store names of the detectors with alarm flag
 * @param update_flag - Flag indicating whether there is a new update
 */
class Popup_List {
    private alert_list: string[];
    private alarm_list: string[];
    private update_flag: boolean;

    constructor(){
        this.alert_list = [];
        this.alarm_list = [];
        this.update_flag = false;
    }

    /**
     * List of all detectors with alert flag
     * @returns alert list
     */
    get_alerts(): string[] {
        return this.alert_list;
    }

    /**
     * List of all detectors with alarm flag
     * @returns alarm list
     */
    get_alarms(): string[] {
        return this.alarm_list;
    }

    /**
     * Get update flag
     * @returns update state
     */
    get_flag(): boolean {
        return this.update_flag;
    }

    /**
     * Set update flag
     * @param state - update state
     */
    set_flag(state: boolean): void {
        this.update_flag = state;
    }

    /**
     * Detect if the detector is in the alert list
     * @param detector - name of the detector
     * @return boolean
     */
    alert_loc(detector: string): number {
        return this.alert_list.indexOf(detector);
    }

    /**
     * Detect if the detector is in the alarm list
     * @param detector - name of the detector
     * @return boolean
    */
    alarm_loc(detector: string): number {
        return this.alarm_list.indexOf(detector);
    }

    /**
     * Add a new detector to the alert list
     * @param detector - name of the detector
     */
    add_alert(detector: string): void {
        let det_loc: number = this.alarm_loc(detector);
        if(det_loc != -1){
            this.alarm_list.splice(det_loc, 1);
        }
        if(this.alert_loc(detector) == -1){
            this.alert_list.push(detector);
            this.update_flag = true;
        }
    }

    /**
     * Add a new detector to the alarm list
     * @param detector - name of the detector
     */
    add_alarm(detector: string): void {
        this.remove_alert(detector);
        if(this.alarm_loc(detector) == -1){
            this.alarm_list.push(detector);
            this.update_flag = true;
        }
    }

    /**
     * Remove detector from the alert list
     * @param detector - name of the detector
     */
    remove_alert(detector: string): void {
        let det_loc: number = this.alert_loc(detector);
        if(det_loc != -1){
            this.alert_list.splice(det_loc, 1);
        }
    }
}

export default Popup_List;
