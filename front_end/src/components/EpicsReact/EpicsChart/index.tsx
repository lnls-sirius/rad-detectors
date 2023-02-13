import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import * as S from './styled';
import Epics from "../../../data-access/EPICS/Epics";
import { capitalize, getAxisColors, simplifyLabel } from "../../../controllers/chart";
import { colors, Square } from "../../../assets/themes";
import { DictStr, RefChart, ScaleType } from "../../../assets/interfaces/patterns";
import { led_limits } from "../../../assets/constants";
import { EpicsChartInterface } from "../../../assets/interfaces/components";
import { DictEpicsData, EpicsData, PvsRadInterface } from "../../../assets/interfaces/access-data";

class EpicsChart extends Component<EpicsChartInterface, {color_axis: string[]}>{
  private chartRef: RefChart;
  private data: Chart.ChartData;
  public chart: null|Chart;
  private refreshInterval: number = 100;
  private epics: Epics;
  private timer: null|NodeJS.Timer;

  constructor(props: EpicsChartInterface){
    super(props);
    this.updateChart = this.updateChart.bind(this);

    this.chartRef = createRef();
    this.data = props.data;
    this.chart = null;
    this.state = {
      color_axis: this.loadAxisColors()
    }

    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }
    this.epics = this.handleEpics();
    this.timer = setInterval(
      this.updateChart, this.refreshInterval);
  }

  loadAxisColors(): string[] {
    let axis_col: string[] = [];
    Object.keys(this.props.pvs_data).map((pvname: string, idx: number) => {
      axis_col[idx] = getAxisColors(
        "dose_rate", this.props.pvs_data[pvname as keyof PvsRadInterface]);
    })
    axis_col[axis_col.length + 1] = "#ff00000"
    return axis_col
  }

  handleEpics(): Epics {
    if(this.props.pv_name.length != 0){
      return new Epics(this.props.pv_name);
    }
    return new Epics(["FakePV"]);
  }

  componentDidUpdate(): void {
    this.epics = this.handleEpics();
    if(this.state.color_axis.length < 3){
      this.setState({
        color_axis: this.loadAxisColors()
      })
    }
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
    const pvData: DictEpicsData = this.epics.pvData;

    Object.entries(pvData).map(async ([pv_name, data]: [string, EpicsData], idx_data: number)=>{
      const pvname: string = simplifyLabel(pv_name);
      if(typeof(data.value) == "number"){
        datasetList[idx_data] = data.value;
        labelList[idx_data] = pvname;
        colorList[idx_data] = this.verifyAlertAlarm(
          colors.limits.normal, data.value, pv_name);
      }
    })
    let dataset: Chart.ChartDataSets[] = [{
      data: datasetList,
      backgroundColor: colorList,
      borderColor: colorList
    }]

    return [dataset, labelList];
  }

  // Create a new chart object
  createChart(reference: HTMLCanvasElement): Chart {
    const scalesOpt: ScaleType = {
      x: {
        display: true,
        type: 'category',
        ticks: {
          maxRotation: 45,
          minRotation: 45,
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
        <S.LegendWrapper>
          {
          this.state.color_axis.map((color: string) => {
            return <Square value={color}/>
          })
          }
        </S.LegendWrapper>
      </S.ChartWrapper>
    )
  }
}

export default EpicsChart;
