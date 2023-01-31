import { PvsRadInterface } from "../assets/interfaces/access-data";
import pvs_rad from "../assets/backend_info/pvs_rad.json";

class Detectors_List {
    private detectors_list: PvsRadInterface;

    constructor(){
        this.detectors_list = pvs_rad;
    }

    get_detectors(): PvsRadInterface {
        return this.detectors_list;
    }

    update_detectors(detectors: PvsRadInterface): void {
        this.detectors_list = detectors;
    }
}

export default Detectors_List;
