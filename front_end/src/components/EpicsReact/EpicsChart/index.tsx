import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import Epics from "../data-access/EPICS/Epics";
import { colors } from "../../../assets/themes";
import { led_limits } from "../../../assets/constants";
import { ScaleType, DictEpicsData, EpicsChartInterface,
  EpicsData, RefChart } from "../assets/interfaces";
import * as S from './styled';

/**
 * EPICS Chart that displays a list of PVs.
*/
class EpicsChart extends Component<EpicsChartInterface>{
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

    if(props.updateInterval!=undefined){
      this.refreshInterval = props.updateInterval;
    }
    this.epics = this.handleEpics();
    this.timer = setInterval(
      this.updateChart, this.refreshInterval);
  }

  /**
   * Connect all the PVs to be analyzed with an EPICS object.
   * @returns Epics connection
   */
  handleEpics(): Epics {
    if(this.props.pv_name.length != 0){
      return new Epics(this.props.pv_name);
    }
    return new Epics(["FakePV"]);
  }

  /**
   * Update EPICS object
   */
  componentDidUpdate(): void {
    this.epics = this.handleEpics();
  }

  /**
   * Set new datasets and labels to the EPICS Chart.
   * @param newData - List of Datasets to be shown in the chart.
   * @param labels - List of labels to be shown in the chart.
   */
  updateDataset(newData: any[], labels: string[]): void {
    if(this.chart){
      this.chart.data.labels = labels;
      this.chart.data.datasets = newData;
      this.chart.update();
    }
  }

  /**
   * Remove redundant PV information from the PV name
   *
   * @param pv_name - PV name
   * @param value - Position of the relevant information split with ':'
   * @returns simplified PV name
   */
  simplifyLabel(pv_name: string, value?: number): string {
    if(value == undefined){
        value = 1;
    }
    const name_split: string[] = pv_name.split(":")
    return name_split[value]
  }

  /**
  * Capitalize string
  *
  * @param str - normal string
  * @returns capitalized string
  */
  capitalize(str: string): string {
    return str[0].toUpperCase()+str.slice(1)
  }

  /**
   * Update the EPICS chart with more recent data received from the PVs.
   */
  async updateChart(): Promise<void> {
    if(this.chart != null){
      const [datasetList, labelList]: [
        Chart.ChartDataSets[], string[]] = await this.buildChart();
      let dataset: Chart.ChartDataSets[] = datasetList;
      dataset = this.limitAxis(datasetList)
      this.updateDataset(dataset, labelList);
    }
  }

  /**
   * Add limit axis lines to the chart.
   * @param datasetList - Dataset to be added to the chart.
   * @returns datasetList with limit axis lines.
   */
  limitAxis(datasetList: Chart.ChartDataSets[]): Chart.ChartDataSets[] {
    Object.keys(led_limits).map((label: string) => {
      const color: string = colors.limits[label];
      if(datasetList[0].data){
        const datasetTemp: Chart.ChartDataSets = {
          data: (datasetList[0].data.map(()=>{return led_limits[label]})),
          type: 'line',
          yAxisID: 'y',
          label: this.capitalize(label),
          borderColor: color,
          backgroundColor: color
        }
        datasetList.push(datasetTemp);
      }
    })
    return datasetList
  }

  /**
   * Change bar color with alert or alarm parameters.
   * @param value - Value measured by the PV.
   * @param pv_name - Name of the PV being analyzed.
   * @returns color of the bar representing the analysed PV.
   */
  verifyAlertAlarm(value: number, pv_name: string): string {
    if(this.props.alarm!=undefined){
      if(value >= this.props.alarm){
        if(this.props.popup){
          this.props.popup.add_alarm(pv_name);
        }
        return colors.limits.alarm;
      }
    }

    if(this.props.alert != undefined){
      if(value >= this.props.alert){
        if(this.props.popup){
          this.props.popup.add_alert(pv_name);
        }
        return colors.limits.alert;
      }
    }

    return colors.limits.normal;
  }

  /**
   * Build a dataset with the data read from EPICS.
   * @returns [
   *  Chart Datasets List, Chart Labels list
   * ]
   */
  async buildChart(): Promise<[Chart.ChartDataSets[], string[]]> {
    let datasetList: number[] = [];
    let labelList: string[] = [];
    let colorList: string[] = [];
    const pvData: DictEpicsData = this.epics.pvData;

    Object.entries(pvData).map(async ([pv_name, data]: [string, EpicsData], idx_data: number)=>{
      const pvname: string = this.simplifyLabel(pv_name);
      if(typeof(data.value) == "number"){
        datasetList[idx_data] = data.value;
        labelList[idx_data] = pvname;
        colorList[idx_data] = this.verifyAlertAlarm(
          data.value, pv_name);
      }
    })
    let dataset: Chart.ChartDataSets[] = [{
      data: datasetList,
      backgroundColor: colorList,
      borderColor: colorList
    }]

    return [dataset, labelList];
  }

  /**
   * Create a Chart Object.
   * @param reference - HTML canvas element.
   * @returns new Chart object
   */
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
        }
      }
    }

    const config: any = {
      type: "bar",
      data: this.data,
      options: chartOptions
    }

    if(this.props.configOptions != undefined){
      config.options = this.props.configOptions(
        config.options, this.props.pv_name);
    }

    return new Chart(
      reference,
      config
    );
  }

  /**
   * Create a new Chart when the component is mounted.
   */
  componentDidMount(): void {
    if(this.chartRef.current != null){
      this.chart = this.createChart(
        this.chartRef.current);
      this.updateChart();
    }else{
      console.log("Error!")
    }
  }

  /**
   * Unmount the chart
   */
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
