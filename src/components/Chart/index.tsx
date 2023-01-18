import { Component, createRef } from "react";
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import * as S from './styled';
import pvs_rad from "../../assets/backend_info/pvs_rad.json";
import { ArchiverDataPoint, DictString, PvsRadInterface } from "../../assets/interfaces";
import { getArchiver } from "../../data-access/archiver/arch_impl";
import { colors } from "../../assets/themes";
import { iconList } from "../../assets/icons";

// BaseChartInterface
class BaseChart extends Component<any>{
  // Create a Basic Chart Element
  private chartRef: any;
  private data: any;
  public chart: null|Chart;
  private timer: any;
  private pvs: PvsRadInterface = pvs_rad;
  private date_interval: Date[];
  private pv_list: string[];

  // Initialize chart variables
  constructor(props: any){
    super(props);
    this.updateChart = this.updateChart.bind(this);

    this.chartRef = createRef();
    this.data = props.data;
    this.chart = null;
    this.date_interval = [];
    this.pv_list = [];

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
    let axisId: string = "y";
    await Promise.all(
      ["integrated_dose", "neutrons", "gamma"].map(async (pv_type: string, idx: number) => {
        this.date_interval[1] = new Date();
        this.date_interval[0] = new Date(this.date_interval[1].getTime() - 3600000);
        this.pv_list[idx] = this.pvs[this.props.name as keyof PvsRadInterface][pv_type];
        let axis_colors: DictString = colors.axis;
        const archiverResult: ArchiverDataPoint[]|undefined = await getArchiver(
          this.pv_list[idx], this.date_interval[0], this.date_interval[1], 800);
        if(archiverResult != undefined){
          const dataset: Array<ArchiverDataPoint> = await this.buildDataset(archiverResult);
          axisId=(pv_type!="integrated_dose")?"y":"y2";
          const datasetTemp: any = {
            data: dataset,
            yAxisID: axisId,
            label: this.pv_list[idx],
            borderColor: axis_colors[pv_type as keyof DictString],
            backgroundColor: axis_colors[pv_type as keyof DictString]
          }
          datasetList[idx] = datasetTemp;
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
                title: {
                  display: true,
                  text: "uSv/h"
                }
              },
              y2: {
                display: true,
                title: {
                  display: true,
                  text: "uSv"
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

      });
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

  archViewerLink(): void {
    let url_arch_view: string = "http://ais-eng-srv-ta.cnpem.br/archiver-viewer/?"
    if(this.pv_list.length == 3 && this.date_interval.length == 2){
      url_arch_view += "pv=" + this.pv_list[0].toString();
      url_arch_view += "&pv=" + this.pv_list[1].toString();
      url_arch_view += "&pv=" + this.pv_list[2].toString();
      url_arch_view += "&from=" + this.date_interval[0];
      url_arch_view += "&to=" + this.date_interval[1];
      window.open(url_arch_view, '_blank');
    }
  }

  render() {
    return (
      <S.ChartWrapper>
        <S.ArchViewer
            onClick={()=>this.archViewerLink()}>
          <S.ChartIcon
            icon={iconList['line_chart']}/>
        </S.ArchViewer>
        <S.Chart
          id="canvas"
          ref={this.chartRef}/>
      </S.ChartWrapper>
    )
  }
}

export default BaseChart;
