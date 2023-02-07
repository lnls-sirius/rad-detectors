import { PvsRadInterface } from "../assets/interfaces/access-data";
import { fetchDetectorsData, saveDetectorsData } from "../data-access/Rad_server";

class Detectors_List {
    private detectors_list: PvsRadInterface = {};

    async init(): Promise<boolean>{
        this.detectors_list = await fetchDetectorsData();
        return false;
    }

    get_detectors(): PvsRadInterface {
        return this.detectors_list;
    }

    async update_detectors(detectors: PvsRadInterface): Promise<void> {
        this.detectors_list = detectors;
        await saveDetectorsData(detectors);
    }
}

export default Detectors_List;
