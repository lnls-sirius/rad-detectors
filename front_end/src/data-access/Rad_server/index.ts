import axios from "axios";
import { PvsRadInterface } from "../../assets/interfaces/access-data";

/**
 * Fetch radiation detectors configuration data from the server
 * @returns configuration data
 */
async function fetchDetectorsData(): Promise<PvsRadInterface> {
    const jsonurl:string = `${window.location.protocol}//10.30.1.50:8080/load`;
    return await axios
      .get(jsonurl, {
          timeout: 10000,
          method: "get",
          headers : {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
          },
      })
      .then((res) => {
        return res.data;
      })
}

/**
 * Save radiation detectors configuration data from the server
 *
 * @param detectors - Modified radiation detectors configuration data
 * @returns ''
 */
async function saveDetectorsData(detectors: PvsRadInterface): Promise<string> {
  const jsonurl:string = `${window.location.protocol}//10.30.1.50:8080/save`;
  return await axios
    .post(jsonurl, {
        method: "post",
        timeout: 10000,
        data: detectors,
        headers : {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*'
        },
    })
    .then((res) => {
      return res.data;
    })
}

export {
    fetchDetectorsData,
    saveDetectorsData
}
