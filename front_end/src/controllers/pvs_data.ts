import { addNewRegister, fetchDetectorsData, saveDetectorsData } from "../data-access/Rad_server";
import { PvsRadInterface } from "../assets/interfaces/access-data";

/**
 * Stores the Radiation detectors configuration data for faster UI interactions.
 *
 * @param detectors_list - Radiation detectors configuration data
 */
class Detectors_List {
    private detectors_list: PvsRadInterface = {};
    private user: string = "No user";

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
     * Getter and Setter for admin users
     */
    set_edit_user(logged_user: string): void {
        this.user = logged_user;
    }

    /**
     * Update detectors_list with the new configurations
     *
     * @param detectors - New radiation detectors configuration data
     */
    async update_detectors(detectors: PvsRadInterface): Promise<void> {
        this.detectors_list = detectors;
        addNewRegister(this.user, new Date(), "Detector List Changed");
        await saveDetectorsData(detectors);
    }
}

export default Detectors_List;
