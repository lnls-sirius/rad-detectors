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

async function fetchDetectorsData(): Promise<PvsRadInterface> {
    const jsonurl:string = `${window.location.protocol}//127.0.0.1:8080/load`;
    return await httpRequest(jsonurl);
}

async function saveDetectorsData(): Promise<PvsRadInterface> {
  const jsonurl:string = `${window.location.protocol}//127.0.0.1:8080/save`;
  return await httpRequest(jsonurl);
}

export {
    fetchDetectorsData,
    saveDetectorsData
}
