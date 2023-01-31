import axios from "axios";
import { PvsRadInterface } from "../../assets/interfaces/access-data";

// Send a request to the backend
async function httpRequest(jsonurl: string): Promise<any>{
    return await axios
    .get(jsonurl, {
        timeout: 10000,
        method: "GET",
        headers : {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*'
        },
    })
    .then((res) => {
      return res.data;
    })
}

function fetchDetectorsData(): Promise<PvsRadInterface> {
    const jsonurl = `${window.location.protocol}//10.20.21.52:8080/`;
    const res: Promise<PvsRadInterface> = httpRequest(jsonurl);
    return res
}

export {
    fetchDetectorsData
}
