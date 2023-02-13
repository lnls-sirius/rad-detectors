import { ArchiverDataPoint } from "../../assets/interfaces/access-data";
import archInterface from "./arch_factory";

async function getArchiver(name: string, start: Date, end: Date, optimization: number): Promise<undefined|ArchiverDataPoint[]>{
    try {
        const res = await archInterface.fetchData(
        name, start, end, optimization);
        let { data } = res;

        if(data.length == 1){
            const value: number = data[0].y;
            data = [{
                x: start,
                y: value
            },
            {
                x: end,
                y: value
            }]
        }
        return data;
    } catch (e) {
        console.log("Error: "+ e);
    }
}

export {
    getArchiver
}
