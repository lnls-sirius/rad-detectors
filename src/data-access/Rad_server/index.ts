import axios from "axios";
import { PvsRadInterface } from "../../assets/interfaces/access-data";

async function fetchDetectorsData(): Promise<PvsRadInterface> {
    const jsonurl:string = `${window.location.protocol}//127.0.0.1:8080/`;
    return await axios
    .get(jsonurl, {
        timeout: 10000,
        method: "GET",
        responseType: "json",
        headers : {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res) => {
      return res.data;
    });
}

export {
    fetchDetectorsData
}
