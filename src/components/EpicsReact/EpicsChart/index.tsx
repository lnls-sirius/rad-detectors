import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import * as S from './styled';
import Epics from "../../../data-access/EPICS/Epics";
import { capitalize, getAxisColors, simplifyLabel } from "../../../controllers/chart";
import { colors } from "../../../assets/themes";
import { DictStr, RefChart, ScaleType } from "../../../assets/interfaces/patterns";
import { led_limits } from "../../../assets/constants";
import { EpicsChartInterface } from "../../../assets/interfaces/components";
import { DictEpicsData, EpicsData } from "../../../assets/interfaces/access-data";

class EpicsChart extends Component<EpicsChartInterface>{
  private chartRef: RefChart;
  private data: Chart.ChartData;
  public chart: null|Chart;
  private refreshInterval: number = 500;
  private epics: Epics;
  private timer: null|NodeJS.Timer;

  constructor(props: EpicsChartInterface){
    super(props);
    this.updateChart = this.updateChart.bind(this);

    this.chartRef = createRef();
    this.data = props.data;
    this.chart = null;

    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }

    this.epics = new Epics(this.props.pv_name);
    this.timer = setInterval(
      this.updateChart, this.refreshInterval);
  }

  updateDataset(newData: any[], labels: string[]): void {
    if(this.chart){
      this.chart.data.labels = labels;
      this.chart.data.datasets = newData;
      this.chart.update();
    }
  }

  async updateChart(): Promise<void> {
    if(this.chart != null){
      const [datasetList, labelList]: [
        Chart.ChartDataSets[], string[]] = await this.buildChart();
      let dataset: Chart.ChartDataSets[] = datasetList;
      dataset = this.limitAxis(datasetList)
      this.updateDataset(dataset, labelList);
    }
  }

  limitAxis(datasetList: Chart.ChartDataSets[]): Chart.ChartDataSets[] {
    Object.keys(led_limits).map((label: string) => {
      const color: string = colors.limits[label as keyof DictStr];
      if(datasetList[0].data){
        const datasetTemp: Chart.ChartDataSets = {
          data: (datasetList[0].data.map(()=>{return led_limits[label]})),
          type: 'line',
          yAxisID: 'y',
          label: capitalize(label),
          borderColor: color,
          backgroundColor: color
        }
        datasetList.push(datasetTemp);
      }
    })
    return datasetList
  }

  verifyAlertAlarm(color: string, value: number, pv_name: string): string {
    if(this.props.alarm!=undefined){
      if(value >= this.props.alarm){
        this.props.popup.add_alarm(pv_name);
        return colors.limits.alarm;
      }
    }

    if(this.props.alert != undefined){
      if(value >= this.props.alert){
        this.props.popup.add_alert(pv_name);
        return colors.limits.alert;
      }
    }

    return color;
  }

  async buildChart(): Promise<[Chart.ChartDataSets[], string[]]> {
    let datasetList: number[] = [];
    let labelList: string[] = [];
    let colorList: string[] = [];
    let colorListAA: string[] = [];
    const pvData: DictEpicsData = this.epics.pvData;

    Object.entries(pvData).map(async ([pv_name, data]: [string, EpicsData], idx_data: number)=>{
      const simple_name: string = simplifyLabel(pv_name);
      if(typeof(data.value) == "number"){
        datasetList[idx_data] = data.value;
        labelList[idx_data] = simple_name;
        colorList[idx_data] = await getAxisColors("", simple_name);
        colorListAA[idx_data] = this.verifyAlertAlarm(
          colorList[idx_data], data.value, pv_name);
      }
    })
    let dataset: Chart.ChartDataSets[] = [{
      data: datasetList,
      backgroundColor: colorListAA,
      borderColor: colorList
    }]
    if(colorListAA.includes(colors.limits.alert) ||
        colorListAA.includes(colors.limits.alarm)){
      dataset[0].borderWidth = 5;
    }
    return [dataset, labelList];
  }

  // Create a new chart object
  createChart(reference: HTMLCanvasElement): Chart {
    const scalesOpt: ScaleType = {
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
    }

    const chartOptions: Chart.ChartOptions = {
      animation: {
        duration: 0
      },
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
      scales: scalesOpt,
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

    const config: any = {
      type: "bar",
      data: this.data,
      options: chartOptions
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
