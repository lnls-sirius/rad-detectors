
class Popup_List {
    private alert_list: string[] = [];
    private alarm_list: string[] = [];

    get_alerts(): string[] {
        return this.alert_list;
    }

    get_alarms(): string[] {
        return this.alarm_list;
    }

    alert_loc(detector: string): number {
        return this.alert_list.indexOf(detector);
    }

    alarm_loc(detector: string): number {
        return this.alarm_list.indexOf(detector);
    }

    add_alert(detector: string): void {
        let det_loc: number = this.alarm_loc(detector);
        if(det_loc != -1){
            this.alarm_list.splice(det_loc, 1);
        }
        if(this.alert_loc(detector) == -1){
            this.alert_list.push(detector);
        }
    }

    add_alarm(detector: string): void {
        this.remove_alert(detector);
        if(this.alarm_loc(detector) == -1){
            this.alarm_list.push(detector);
        }
    }

    remove_alert(detector: string): void {
        let det_loc: number = this.alert_loc(detector);
        if(det_loc != -1){
            this.alert_list.splice(det_loc, 1);
        }
    }
}

export default Popup_List;
