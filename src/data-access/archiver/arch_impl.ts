import { ArchiverDataPoint } from "../../assets/interfaces/access-data";
import archInterface from "./arch_factory";

async function getArchiver(name: string, start: Date, end: Date, optimization: number): Promise<undefined|ArchiverDataPoint[]>{
    try {
        const res = await archInterface.fetchData(
        name, start, end, optimization);
        const { data } = res;
        data.shift();
        return data;
    } catch (e) {
        console.log("Error: "+ e);
    }
}

export {
    getArchiver
}
