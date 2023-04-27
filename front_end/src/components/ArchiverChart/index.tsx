import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import { getArchiver } from "../../data-access/archiver/arch_impl";
import { capitalize } from "../../controllers/chart";
import { colors } from "../../assets/themes";
import { ArchDatasetDict, ArchiverDataPoint } from "../../assets/interfaces/access-data";
import { DictNum, DictStr, RefChart, ScaleType } from "../../assets/interfaces/patterns";
import { ArchChartInterface, DetListInterface, PvDataInterface } from "../../assets/interfaces/components";
import * as S from './styled';
import { SiriusInvisible } from "sirius-epics-react";

/**
 *
 * @param props -
  * pv_list - List of PVs to be displayed.
  * data - initial chart data.
  * auto_update - If it updates the chart automatically.
  * start_date - Start date.
  * end_date - End date.
  * interval - Hours before now, used with auto_update.
  * limits - Limits to be shown in the chart.
  * optimization - Optimization value.
  * configOptions - Function to configure the chart options.
 * @param chartRef - Chart reference.
 * @param data - Chart data.
 * @param chart - Chart object.
 * @param timer - Timer object.
 * @param data_interval - Interval shown in the chart.
 * @param datasetsChart  - All datasets shown in the chart.
 */
class ArchiverChart extends Component<ArchChartInterface, DetListInterface>{
  private chartRef: RefChart;
  private data: Chart.ChartData;
  private chart: null|Chart;
  private timer: null|NodeJS.Timer;
  private date_interval: Date[];
  private datasetsChart: ArchDatasetDict;

  constructor(props: ArchChartInterface){
    super(props);
    this.updateChartEpics = this.updateChartEpics.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.chartUpdateRegister = this.chartUpdateRegister.bind(this);
    this.handleLog = this.handleLog.bind(this);

    this.chartRef = createRef();
    this.data = props.data;
    this.chart = null;
    this.date_interval = [];
    this.datasetsChart = {};
    this.state = {
      det_list: this.detectorsList()
    };

    if(this.props.auto_update != undefined && this.props.auto_update){
      setTimeout(this.updateChart, 300);
      this.timer = setInterval(
        this.updateChartEpics, this.props.updateInterval);
    }else{
      this.timer = null;
    }
  }

  /**
   * After component mounts
   */
  componentDidMount(): void {
    if(this.chartRef.current != null){
      this.chart = this.createChart(
        this.chartRef.current);
      this.updateChart();
    }else{
      console.log("Error!");
    }
  }

  /**
   * Update detectors list with update
   */
  componentDidUpdate(): void {
    if(this.state.det_list.length < 1){
      setTimeout(()=>{
        this.setState({
          det_list: this.detectorsList()
        })}, 300);
    }
  }

  /**
   * Set Interval to be shown in the chart.
   */
  setDate(): void {
    if(this.props.end_date != undefined){
      this.date_interval[1] = this.props.end_date;
    }else{
      this.date_interval[1] = new Date();
    }

    if(this.props.start_date != undefined){
      this.date_interval[0] = this.props.start_date;
    }else{
      let hours: number = 1;
      if(this.props.interval != undefined){
        hours = this.props.interval;
      }
      this.date_interval[0] = new Date(
        this.date_interval[1].getTime() - 3600000*hours);
    }
  }

  /**
   * Get list of PVs shown in the chart.
   * @returns PVs list
   */
  getPvList(): PvDataInterface[] {
    return this.props.pv_list;
  }

  /**
   * Get date interval shown in the chart.
   * @returns [startDate, endDate]
   */
  getDateInterval(): Date[] {
    return this.date_interval;
  }

  /**
   * Update datasets shown in the chart.
   * @param newData - New data to be updated on the chart.
   */
  updateDataset(newData: any): void {
    if(newData != undefined && this.chart != undefined){
      this.chart.data.datasets = newData;
      this.chart.update();
    }
  }

  /**
   * Updates the chart with EPICS or Archiver.
   */
  async updateChartEpics(): Promise<void> {
    const datasetList = await this.buildChart("update");
    this.updateDataset(datasetList);
  }

  /**
   * Initialize the chart with Archiver.
   */
  async updateChart(): Promise<void> {
    if(this.chart != null){
      const datasetList: Chart.ChartDataSets[] = await this.buildChart("init");
      this.updateDataset(datasetList);
    }
  }

  /**
   * Transforms ArchiverData into Coordinates.
   * @param dataList - Datapoint received from the Archiver.
   * @returns
   */
  buildDataset(dataList: ArchiverDataPoint[]): ArchiverDataPoint[]{
    return dataList.map((data: ArchiverDataPoint) => {
      return {
        x: data.x,
        y: data.y
      };
    });
  }

  /**
   * Show limit axis.
   * @param datasetList - Datasets to be shown in the chart.
   * @returns datasetList with axis limits.
   */
  limitAxis(datasetList: Chart.ChartDataSets[], limits: DictNum): Chart.ChartDataSets[] {
    Object.entries(limits).map(([label, value]: [string, number]) => {
      const datasetTemp: Chart.ChartDataSets = {
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
        label: capitalize(label),
        borderColor: colors.limits[label as keyof DictStr],
        backgroundColor: colors.limits[label as keyof DictStr]
      }
      datasetList.push(datasetTemp);
    })
    return datasetList
  }

  /**
   * Build chart datasets with EPICS or Archiver
   */
  async buildChart(type: string): Promise<Chart.ChartDataSets[]> {
    let datasetList: Chart.ChartDataSets[] = [];
    this.setDate();
    await Promise.all(
      this.props.pv_list.map(async (pv_data: PvDataInterface, id: number) => {
        let optimize: number = 0;

        const id_dc: string = pv_data.name.replace("RAD:", "");
        if(type == "init" || this.props.optimization == -1){
          if(this.props.optimization && this.props.optimization != -1){
            optimize = this.props.optimization;
          }
          const archiverResult: ArchiverDataPoint[]|undefined = await getArchiver(
            pv_data.name, this.date_interval[0], this.date_interval[1], optimize);
          if(archiverResult != undefined){
            this.datasetsChart[id_dc] = await this.buildDataset(archiverResult);
          }
        }

        const datasetTemp: Chart.ChartDataSets = {
          data: this.datasetsChart[id_dc],
          yAxisID: 'y',
          label: pv_data.label,
          borderColor: pv_data.color,
          backgroundColor: pv_data.color
        }
        datasetList[id] = datasetTemp;
      })
    );

    if(this.props.limits){
      this.limitAxis(
        datasetList, this.props.limits);
    }
    return datasetList;
  }

  /**
   * Create a new chart object
   * @param reference - HTML canvas
   * @returns chart
   */
  createChart(reference: HTMLCanvasElement): Chart {
    const scalesOpt: ScaleType = {
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true
        }
      },
      x: {
        display: true,
        offset: false,
        type: 'time',
        ticks: {
          maxRotation: 45,
          minRotation: 45
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
    }
    const chartOptions: Chart.ChartOptions = {
      animation: { duration: 0 },
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 0
        },
        line: {
          tension: 0.2
        }
      },
      hover: {
          mode: "nearest",
          intersect: true
      },
      scales: scalesOpt,
      plugins:{
        legend: {
          display: true
        }
      }
    }
    const config: any  = {
      type: "line",
      data: this.data,
      options: chartOptions
    }

    if(this.props.configOptions != undefined){
      config.options = this.props.configOptions(
        config.options, this.props.pv_list);
    }

    return new Chart(
      reference,
      config
    );
  }

  /**
   * Handle tranform chart to Log Scale
   */
  handleLog(event: React.MouseEvent): void {
    if(this.chart?.options.scales){
      const scales: ScaleType = this.chart.options.scales;
      const log_txt: string = "(Log)";
      if(scales){
        let y_axis_txt: string = scales.y.title.text;
        if(scales.y.type == 'logarithmic'){
          scales.y.type = 'linear';
          scales.y.title.text = y_axis_txt.replace(log_txt, "");
        }else{
          scales.y.type = 'logarithmic';
          scales.y.title.text = y_axis_txt+log_txt;
          scales.y.beginAtZero = false;
        }
      }
    }
  }

  /**
   * Detect change on the detector list
   */
  chartUpdateRegister(pvInfo: any, pv_name: string): any {
    if(pv_name && pvInfo.value!=null && pvInfo.date!=null){
      const pvname: string = pv_name.replace("RAD:", "");
      this.setDate();
      if(pvname in this.datasetsChart){
        this.datasetsChart[pvname].push({
          x: pvInfo.date,
          y: pvInfo.value
        });
        if(this.datasetsChart[pvname][0].x < this.date_interval[0]){
          this.datasetsChart[pvname].shift();
        }
      }
    }
  }

  /**
   * Show detectors list
   */
  detectorsList(): string[] {
    let det_list: string[] = [];
    this.props.pv_list.map((pv_data: PvDataInterface, idx: number) => {
      det_list[idx] = pv_data.name;
    });
    return det_list;
  }

  /**
   * Unmount component
   */
  componentWillUnmount(): void {
    if(this.timer!=null){
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <S.ChartWrapper
        onDoubleClick={this.handleLog}
        data-testid="arch-chart">
          <SiriusInvisible
            pv_name={this.state.det_list}
            modifyValue={this.chartUpdateRegister}
            update_interval={100}/>
          <S.Chart
            id="canvas"
            ref={this.chartRef}/>
      </S.ChartWrapper>
    )
  }
}

export default ArchiverChart;
