import axios from "axios";
import { PvsRadInterface } from "../../assets/interfaces/access-data";

// Send a request to the backend
function httpRequest(jsonurl: string): any{
    return axios
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

function fetchDetectorsData(): PvsRadInterface {
    const jsonurl: string = `${window.location.protocol}//10.0.105.5:8080/`;
    const res: PvsRadInterface = httpRequest(jsonurl);
    return res
}

export {
    fetchDetectorsData
}
