import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import * as S from './styled';
import { ArchiverDataPoint } from "../../assets/interfaces/access-data";
import { getArchiver } from "../../data-access/archiver/arch_impl";
import { colors } from "../../assets/themes";
import { DictNum, DictStr, RefChart, ScaleType } from "../../assets/interfaces/patterns";
import { capitalize } from "../../controllers/chart";
import { ArchChartInterface, PvDataInterface } from "../../assets/interfaces/components";
import SiriusInvisible from "../EpicsReact/SiriusInvisible";

class ArchiverChart extends Component<ArchChartInterface, {det_list: string[]}>{
  private chartRef: RefChart;
  private data: Chart.ChartData;
  private chart: null|Chart;
  private timer: null|NodeJS.Timer;
  private date_interval: Date[];
  private datasetsChart: {[key: string]: ArchiverDataPoint[]};

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
        this.updateChartEpics, 100);
    }else{
      this.timer = null;
    }
  }

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

  getPvList(): PvDataInterface[] {
    return this.props.pv_list;
  }

  getDateInterval(): Date[] {
    return this.date_interval;
  }

  updateDataset(newData: any): void {
    if(newData != undefined && this.chart != undefined){
      this.chart.data.datasets = newData;
      this.chart.update();
    }
  }

  async updateChartEpics(): Promise<void> {
    const datasetList = await this.buildChart("update");
    this.updateDataset(datasetList);
  }

  async updateChart(): Promise<void> {
    if(this.chart != null){
      const datasetList: Chart.ChartDataSets[] = await this.buildChart("init");
      this.updateDataset(datasetList);
    }
  }

  buildDataset(dataList: ArchiverDataPoint[]): ArchiverDataPoint[]{
    return dataList.map((data: ArchiverDataPoint) => {
      return {
        x: data.x,
        y: data.y
      };
    });
  }

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

  // Create a new chart object
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

  componentDidUpdate(): void {
    if(this.state.det_list.length < 1){
      setTimeout(()=>{
        this.setState({
          det_list: this.detectorsList()
        })}, 300);
    }
  }

  chartUpdateRegister(pvInfo: any, pv_name?: string): void {
    if(pv_name && pvInfo.value!=null && pvInfo.date!=null){
      const pvname: string = pv_name.replace("RAD:", "");
      this.setDate();
      console.log(pvInfo)
      this.datasetsChart[pvname].push({
        x: pvInfo.date,
        y: pvInfo.value
      });
      if(this.datasetsChart[pvname][0].x < this.date_interval[0]){
        this.datasetsChart[pvname].shift();
      }
    }
  }

  detectorsList(): string[] {
    let det_list: string[] = [];
    this.props.pv_list.map((pv_data: PvDataInterface, idx: number) => {
      det_list[idx] = pv_data.name;
    });
    return det_list;
  }

  render() {
    return (
      <S.ChartWrapper
        onDoubleClick={this.handleLog}>
          <SiriusInvisible
            pv_name={this.state.det_list}
            modifyValue={this.chartUpdateRegister}
            updateInterval={100}/>
          <S.Chart
            id="canvas"
            ref={this.chartRef}/>
      </S.ChartWrapper>
    )
  }
}

export default ArchiverChart;
