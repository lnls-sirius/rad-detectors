import axios from 'axios';
import { ArchiverData, ArchiverDataPoint, DataAccess } from '../../assets/interfaces/access-data';

export const ipRegExp = /https?\/((?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])))\//;
export const defaultHost = "ais-eng-srv-ta.cnpem.br";


/**
 * Archiver Class
 *
 * @param host - URL of the server
 * @param url - URL of the Archiver service
 * @param GET_DATA_URL - URL to obtain data with the Archiver service
 */
export class ArchiverDataAccess implements DataAccess{

  private url: string;
  private GET_DATA_URL: string;

  constructor() {
    this.url = defaultHost;
    this.GET_DATA_URL = `${window.location.protocol}//${this.url}/retrieval/data/getData.json`;
  }

  // Parse a point dictionary from the values read in Archiver
  private parseData(data: any[]): ArchiverDataPoint[] {
    const outData: ArchiverDataPoint[] = [];
    data.forEach(({ val, secs, nanos}) => {
      let y: any;
      if (val instanceof Array) {
        const [avg] = val;
        y = avg;
      } else {
        y = val;
      }

      const x = new Date(secs * 1e3 + nanos * 1e-6);
      if (!isNaN(x.getTime())) {
        outData.push({
          x,
          y
        });
      }
    });
    return outData;
  }


  // Fetch PV data in an interval
  async fetchData(pv: string, from: Date, to: Date, optimization: number): Promise<ArchiverData> {
    let jsonurl: string = '';
    let finalData: Array<ArchiverDataPoint> = [];
    let pvValue: string = '';
    this.GET_DATA_URL = `${window.location.protocol}//${this.url}/retrieval/data/getData.json`;

    pvValue = optimization != 0?
      `optimized_`+optimization+`(${pv})`:pv;

    jsonurl = `${this.GET_DATA_URL}?pv=`+pvValue+`&from=${from.toJSON()}&to=${to.toJSON()}`
    const res = await axios
    .get(jsonurl, {
      timeout: 0,
      method: "GET",
      responseType: "text",
      transformResponse: (res) => {
        if (res.includes("Bad Request")) {
          throw `Invalid response from ${jsonurl}`;
        }
        let data: string = res.replace(/(-?Infinity)/g, '"$1"');
        data = data.replace(/(NaN)/g, '"$1"');
        data = JSON.parse(data);
        return data;
      },
    })
    .then((res) => {
      return res.data[0];
    });
    finalData = this.parseData(res.data);

    return {
      meta: res.meta,
      data: finalData
    };
  }

}
