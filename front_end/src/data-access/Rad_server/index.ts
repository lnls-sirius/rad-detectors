import axios from "axios";
import { PvsRadInterface } from "../../assets/interfaces/access-data";

const url: string = `${window.location.protocol}//rad-mon-api.lnls.br`;

/**
 * Add a log register.
 */
function addNewRegister(email: string, datetime: Date, desc: string){
  const log_row: string = datetime + ": " + email + " - " + desc;
  saveDetectorsData(log_row, "log");
}

/**
 * Fetch radiation detectors configuration data from the server
 * @returns configuration data
 */
async function fetchDetectorsData(req_type: string="detectors"): Promise<PvsRadInterface> {
  const jsonurl:string = url + '/load';

  return await axios
    .post(jsonurl, {
        method: "post",
        timeout: 2000,
        data: {
          type: req_type
        },
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
async function saveDetectorsData(new_data: PvsRadInterface|string, req_type: string="detectors"): Promise<string> {
  const jsonurl:string = url + '/save';
  return await axios
    .post(jsonurl, {
        method: "post",
        timeout: 2000,
        data: {
          data: new_data,
          type: req_type
        },
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
  saveDetectorsData,
  addNewRegister
}
