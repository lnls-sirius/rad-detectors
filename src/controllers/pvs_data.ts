import { PvsRadInterface } from "../assets/interfaces/access-data";
import { fetchDetectorsData } from "../data-access/Rad_server";

class Detectors_List {
    private detectors_list: PvsRadInterface = {};

    constructor(){
        this.detectors_list = fetchDetectorsData();
    }

    get_detectors(): PvsRadInterface {
        return this.detectors_list;
    }

    update_detectors(detectors: PvsRadInterface): void {
        this.detectors_list = detectors;
    }
}

export default Detectors_List;
