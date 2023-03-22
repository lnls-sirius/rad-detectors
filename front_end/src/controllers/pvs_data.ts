import { fetchDetectorsData, saveDetectorsData } from "../data-access/Rad_server";
import { PvsRadInterface } from "../assets/interfaces/access-data";

/**
 * Stores the Radiation detectors configuration data for faster UI interactions.
 *
 * @param detectors_list - Radiation detectors configuration data
 */
class Detectors_List {
    private detectors_list: PvsRadInterface = {};

    /**
     * Fetch the radiation detectors configuration data from the server
     *
     * @return loading state
     */
    async init(): Promise<boolean>{
        this.detectors_list = await fetchDetectorsData();
        return false;
    }

    /**
     * Return the radiation detectors configuration data
     *
     * @return configuration data
     */
    get_detectors(): PvsRadInterface {
        return this.detectors_list;
    }

    /**
     * Update detectors_list with the new configurations
     *
     * @param detectors - New radiation detectors configuration data
     */
    async update_detectors(detectors: PvsRadInterface): Promise<void> {
        this.detectors_list = detectors;
        await saveDetectorsData(detectors);
    }
}

export default Detectors_List;
