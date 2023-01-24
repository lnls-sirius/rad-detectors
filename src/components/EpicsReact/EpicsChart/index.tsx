import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import * as S from './styled';
import Epics from "../../../data-access/EPICS/Epics";
import { capitalize, getAxisColors, simplifyLabel } from "../../../controllers/chart";
import { colors } from "../../../assets/themes";
import { DictStr } from "../../../assets/interfaces/patterns";
import { led_limits } from "../../../assets/constants";

class EpicsChart extends Component<any>{
  private chartRef: any;
  private data: any;
  public chart: null|Chart;
  private refreshInterval: number = 500;
  private epics: Epics;
  private timer: any;

  constructor(props: any){
    super(props);
    this.updateChart = this.updateChart.bind(this);

    this.chartRef = createRef();
    this.data = props.data;
    this.chart = null;

    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }

    this.epics = new Epics(this.props.name);
    this.timer = setInterval(
      this.updateChart, this.refreshInterval);
  }

  updateDataset(chart: any, newData: string[], labels: string[]): void {
    chart.data.labels = labels;
    chart.data.datasets = newData;
    chart.update();
  }

  async updateChart(): Promise<void> {
    if(this.chart != null){
      const [datasetList, labelList]: any = await this.buildChart();
      let dataset: any = datasetList;
      dataset = this.limitAxis(datasetList)
      this.updateDataset(this.chart, dataset, labelList);
    }
  }

  limitAxis(datasetList: any): any {
    Object.keys(led_limits).map((label: string) => {
      const color: string = colors.limits[label as keyof DictStr];
      const datasetTemp: any = {
        data: (datasetList[0].data.map(()=>{return led_limits[label]})),
        type: 'line',
        yAxisID: 'y',
        label: capitalize(label),
        borderColor: color,
        backgroundColor: color
      }
      datasetList.push(datasetTemp);
    })
    return datasetList
  }

  verifyAlertAlarm(color: string, value: number): string {
    if(this.props.alarm!=undefined){
      if(value >= this.props.alarm){
        return colors.limits.alarm;
      }
    }
    if(this.props.alert != undefined){
      if(value >= this.props.alert){
        return colors.limits.alert;
      }
    }
    return color;
  }

  async buildChart(): Promise<any> {
    let datasetList: string[] = [];
    let labelList: string[] = [];
    let colorList: string[] = [];
    const pvData: any = this.epics.pvData;

    Object.entries(pvData).map(([pv_name, data]: any, idx_data: number)=>{
      const simple_name: string = simplifyLabel(pv_name);
      datasetList[idx_data] = data.value;
      labelList[idx_data] = simple_name;

      colorList[idx_data] = this.verifyAlertAlarm(
        getAxisColors("", simple_name), data.value);
    })
    const dataset: any = [{
      data: datasetList,
      backgroundColor: colorList,
      borderColor: colorList
    }]
    return [dataset, labelList];
  }

  // Create a new chart object
  createChart(reference: any): Chart {
    let config: any = {
      type: "bar",
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
          x: {
            display: true,
            type: 'category',
            ticks: {
              font: {
                size: 15
              }
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "μSv"
            },
            ticks: {
              font: {
                size: 15
              }
            },
            beginAtZero: true
          }
        },
        plugins:{
          legend: {
              display: false
          },
          title: {
            display: true,
            text: "Integrated Dose",
            font: {
              size: 15
            }
          }
        }
      }
    }

    return new Chart(
      reference,
      config
    );
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
      this.epics.disconnect();
    }
  }

  render() {
    return (
      <S.ChartWrapper>
        <S.Chart
          id="canvas"
          ref={this.chartRef}/>
      </S.ChartWrapper>
    )
  }
}

export default EpicsChart;
