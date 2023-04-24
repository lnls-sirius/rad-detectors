import '@testing-library/jest-dom'
import Popup_List from '../controllers/alert'
import * as chart from '../controllers/chart'

describe('Popup List', () => {
    const popup = new Popup_List()

    it("Popup flag", async () => {
        popup.set_flag(true);
        let flag = popup.get_flag();
        expect(flag).toEqual(true);

        popup.set_flag(false);
        flag = popup.get_flag();
        expect(flag).toEqual(false);
    })

    it("Alert", async () => {
        popup.add_alert("DET1");
        let det_list = popup.get_alerts();
        expect(det_list).toEqual(["DET1"]);

        popup.add_alert("DET3");
        popup.add_alert("DET1");
        popup.add_alert("DET10");
        det_list = popup.get_alerts();
        expect(det_list).toEqual(["DET1", "DET3", "DET10"]);

        popup.add_alarm("DET3");
        det_list = popup.get_alerts();
        expect(det_list).toEqual(["DET1", "DET10"]);

        popup.remove_alert("DET10");
        det_list = popup.get_alerts();
        expect(det_list).toEqual(["DET1"]);
    })

    it("Alarm", async () => {
        let det_list = popup.get_alarms();
        expect(det_list).toEqual(["DET3"])
        ;
        popup.add_alert("DET3");
        det_list = popup.get_alarms();
        expect(det_list).toEqual([]);

        popup.add_alarm("DET5");
        popup.add_alarm("DET8");
        popup.add_alarm("DET5");
        popup.add_alarm("DET4");
        det_list = popup.get_alarms();
        expect(det_list).toEqual(["DET5", "DET8", "DET4"]);
    })
})

describe('Chart', () => {
    it("getAxisColors", async () => {
        const color_gamma = chart.getAxisColors('gamma', {'color': '#00FF00'});
        expect(color_gamma).toEqual('#09bf00');

        const color_random = chart.getAxisColors('gam', {'color': '#00FFFF'});
        expect(color_random).toEqual('#00FFFF');
    })

    it("simplifyLabel", () => {
        const strings = [
            ["RAD:ELSE:Gamma", 2, "Gamma"],
            ["RAD:ELSE:TotalDoseRate:Dose", null, "ELSE"],
            ["RAD:Berthold:Neutrons", null, "Berthold"],
            ["RAD:Thermo5:Gamma", null, "Thermo5"],
            ["RAD:Thermo1:TotalDoseRate", 2, "TotalDoseRate"]
        ]
        for(let i=0; i<5; i++){
            const param = strings[i]
            let device = '';
            if(param[0] != null){
                if(param[1] != null){
                    device = chart.simplifyLabel(param[0].toString(), Number(param[1]));
                }else{
                    device = chart.simplifyLabel(param[0].toString());
                }
            }
            expect(device).toEqual(param[2]);
        }
    })

    it("capitalize", () => {
        const strings = [
            ["gamma", "Gamma"],
            ["random title", "Random title"],
            ["text", "Text"]
        ]
        for(let i=0; i<3; i++){
            const param = strings[i]
            const name = chart.capitalize(param[0]);
            expect(name).toEqual(param[1]);
        }
    })
})
