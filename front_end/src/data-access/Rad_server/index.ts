import axios from "axios";
import { PvsRadInterface } from "../../assets/interfaces/access-data";

async function fetchDetectorsData(): Promise<PvsRadInterface> {
    const jsonurl:string = `${window.location.protocol}//10.0.105.8:8080/load`;
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

async function saveDetectorsData(detectors: PvsRadInterface): Promise<PvsRadInterface> {
  const jsonurl:string = `${window.location.protocol}//10.0.105.8:8080/save`;
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
