import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import * as S from './styled';
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import { ArchiverDataPoint, PvsRadInterface } from "../../assets/interfaces/access-data";
import { getArchiver } from "../../data-access/archiver/arch_impl";
import { colors } from "../../assets/themes";
import { DictNum, DictStr } from "../../assets/interfaces/patterns";
import { dosage_info, dose_rate_limits, led_limits } from "../../assets/constants";
import { getAxisColors, simplifyLabel } from "../../controllers/chart";

class ArchiverChart extends Component<any>{
  private chartRef: any;
  private data: any;
  public chart: null|Chart;
  private timer: any;
  private pvs: PvsRadInterface = pvs_rad;
  private date_interval: Date[];
  private pv_list: string[];

  constructor(props: any){
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.handleLog = this.handleLog.bind(this);

    this.chartRef = createRef();
    this.data = props.data;
    this.chart = null;
    this.date_interval = [];
    this.pv_list = [];

    this.timer = setInterval(
      this.updateChart, 3000);
  }

  getPvList(): string[] {
    return this.pv_list;
  }

  getDateInterval(): Date[] {
    return this.date_interval;
  }

  updateDataset(chart: any, newData: any): void {
    chart.data.datasets = newData;
    chart.update();
  }

  async updateChart(): Promise<void> {
    if(this.chart != null){
      const datasetList: any = await this.buildChart();
      this.updateDataset(this.chart, datasetList);
    }
  }

  buildDataset(dataList: ArchiverDataPoint[]): any[]{
    return dataList.map((data: ArchiverDataPoint) => {
      return {
        x: data.x,
        y: data.y
      };
    });
  }

  limitAxis(datasetList: any, limits: DictNum): any {
    Object.entries(limits).map(([label, value]: [string, number]) => {
      const datasetTemp: any = {
        data: [
          {
            x: this.date_interval[0],
            y: value
          },
          {
            x: this.date_interval[1],
            y: value
          }
        ],
        yAxisID: 'y',
        label: label[0].toUpperCase()+label.slice(1),
        borderColor: colors.limits[label as keyof DictStr],
        backgroundColor: colors.limits[label as keyof DictStr]
      }
      datasetList.push(datasetTemp);
    })
    return datasetList
  }

  async buildChart(): Promise<any> {
    let datasetList: any = [];
    let axisId: string = "y";

    this.date_interval[1] = new Date();
    this.date_interval[0] = new Date(this.date_interval[1].getTime() - 3600000);
    await Promise.all(
      this.props.pv_mon.map(async (pv_type: string, idx: number) => {
        await Promise.all(
          this.props.name.map(async (pvname: string, idx_name: number) => {
            let id: number = (idx*this.props.name.length)+idx_name;
            this.pv_list[id] = this.pvs[pvname as keyof PvsRadInterface][pv_type];
            const archiverResult: ArchiverDataPoint[]|undefined = await getArchiver(
              this.pv_list[id],
              this.date_interval[0], this.date_interval[1], 800);
            if(archiverResult != undefined){
              const dataset: Array<ArchiverDataPoint> = await this.buildDataset(archiverResult);
              axisId='y';
              const datasetTemp: any = {
                data: dataset,
                yAxisID: axisId,
                label: (pv_type=="dose_rate")?
                  simplifyLabel(this.pv_list[id]):dosage_info[pv_type].label,
                borderColor: getAxisColors(
                  pv_type, pvname),
                backgroundColor: getAxisColors(
                  pv_type, pvname)
              }
              datasetList[id] = datasetTemp;
            }
          })
        )
      })
    );
    const dose_rate: boolean = this.props.pv_mon.includes("dose_rate");
    if(dose_rate || this.props.pv_mon.includes("integrated_dose")){
      let limits_axis: DictNum = led_limits;
      if(dose_rate){
        limits_axis = dose_rate_limits;
      }
      this.limitAxis(datasetList, limits_axis);
    }
    return datasetList;
  }

  // Create a new chart object
  createChart(reference: any): Chart {
    let config: any = {
      type: "line",
      data: this.data,
      options: {
        animation: { duration: 0 },
        spanGaps: true,
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0
          }
        },
        hover: {
            mode: "nearest",
            intersect: true
        },
        scales: {
            y: {
              display: true,
              title: {
                display: true,
                text: (this.props.pv_mon.includes("integrated_dose"))?
                  "μSv":"μSv/h"
              }
            },
            x: {
              display: true,
              offset: false,
              type: 'time',
              ticks: {
                maxRotation: 0,
                minRotation: 0
              },
              time: {
                unit: "minute",
                displayFormats: {
                  second: "HH:mm:ss",
                  minute: "HH:mm",
                  hour: "HH:ss",
                  day: "MMM D hh:mm",
                  month: "MMM YYYY",
                },
                tooltipFormat: "ddd MMM DD YYYY HH:mm:ss.S ZZ",
              }
            }
        },
        plugins:{
          legend: {
            display: true
          }
        }
      }
    }

    if(this.props.configOptions != undefined){
      config.options = this.props.configOptions(config.options);
    }

    return new Chart(
      reference,
      config
    );
  }

  handleLog(event: React.MouseEvent): void {
    console.log("342")
    if( event.button === 1 ) {
      const scales: any = this.chart?.options.scales;
      if(scales){
        if(scales.y.type == 'logarithmic'){
          scales.y.type = 'linear';
          scales.y.title.text =
            (this.props.pv_mon.includes("integrated_dose"))?
              "μSv":"μSv/h";
        }else{
          scales.y.type = 'logarithmic';
          scales.y.title.text =
            (this.props.pv_mon.includes("integrated_dose"))?
              "μSv (Log)":"μSv/h (Log)";
        }
      }
    }

  }

  componentDidMount(): void {
    if(this.chartRef.current != null){
      this.chart = this.createChart(
        this.chartRef.current);
      this.updateChart();
    }else{
      console.log("Error!")
    }
  }

  componentWillUnmount(): void {
    if(this.timer!=null){
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <S.ChartWrapper onMouseDown={this.handleLog}>
        <S.Chart
          id="canvas"
          ref={this.chartRef}/>
      </S.ChartWrapper>
    )
  }
}

export default ArchiverChart;
