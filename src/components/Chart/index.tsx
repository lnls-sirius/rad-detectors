import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import * as S from './styled';
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import { ArchiverDataPoint, DictString, PvsRadInterface } from "../../assets/interfaces";
import { getArchiver } from "../../data-access/EPICS/arch_impl";
import { colors } from "../../assets/themes";

// BaseChartInterface
class BaseChart extends Component<any>{
  // Create a Basic Chart Element
  private chartRef: any;
  private data: any;
  public chart: null|Chart;
  private timer: any;
  private pvs: PvsRadInterface = pvs_rad;

  // Initialize chart variables
  constructor(props: any){
    super(props);
    this.updateChart = this.updateChart.bind(this);

    this.chartRef = createRef();
    this.data = props.data;
    this.chart = null;

    this.timer = setInterval(
      this.updateChart, 5000);
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

  async buildChart(): Promise<any> {
    let datasetList: any = [];
    await Promise.all(
      ["integrated_dose", "neutrons", "gamma"].map(async (pv_type: string) => {
        let now: Date = new Date();
        let past_hour: Date = new Date(now.getTime() - 3600000);
        let pv_name: string = this.pvs[this.props.name as keyof PvsRadInterface][pv_type];
        let axis_colors: DictString = colors.axis;
        const archiverResult: ArchiverDataPoint[]|undefined = await getArchiver(
          pv_name, past_hour, now, 800);
        if(archiverResult != undefined){
          const dataset: Array<ArchiverDataPoint> = await this.buildDataset(archiverResult);
          const datasetTemp: any = {
            data: dataset,
            xAxisID: 'x',
            label: pv_name,
            borderColor: axis_colors[pv_type as keyof DictString],
            backgroundColor: axis_colors[pv_type as keyof DictString]
          }
          datasetList.push(datasetTemp);
        }
      })
    );
    return datasetList;
  }

  // Create a new chart object
  createChart(reference: any): Chart{
    return new Chart(
      reference,
      {
        type: "line",
        data: this.data,
        options: {
          animation: { duration: 0 },
          spanGaps: true,
          responsive: true,
          elements: {
            point: {
              hoverRadius: 0
            }
          },
          hover: {
              mode: "nearest",
              intersect: true
          },
          scales: {
              y: {
                  display: true,
              },
              x: {
                  display: true,
                  offset: false,
                  type: 'time',
                  ticks: {
                      maxRotation: 0,
                      minRotation: 0
                  }
              }
          },
          plugins:{
              legend: {
                  display: true
              }
          }
      }

      });
  }

  componentDidMount(): void {
    if(this.chartRef.current != null){
      this.chart = this.createChart(
        this.chartRef.current)
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
      <S.ChartWrapper>
        <S.Chart
          id="canvas"
          ref={this.chartRef}/>
      </S.ChartWrapper>
    )
  }
}

export default BaseChart;
