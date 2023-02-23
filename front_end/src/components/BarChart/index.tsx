import { Component } from "react";
import 'chartjs-adapter-moment';
import EpicsChart from "../EpicsReact/EpicsChart";
import { getAxisColors } from "../../controllers/chart";
import { Square } from "../../assets/themes";
import { led_limits } from "../../assets/constants";
import { EpicsChartInterface } from "../../assets/interfaces/components";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { ScaleType } from "../../assets/interfaces/patterns";
import * as S from './styled';

class BarChart extends Component<any, {color_axis: string[]}>{

  constructor(props: EpicsChartInterface){
    super(props);
    this.state = {
      color_axis: this.loadAxisColors()
    }
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

  componentDidUpdate(): void {
    if(this.state.color_axis.length < 3){
      this.setState({
        color_axis: this.loadAxisColors()
      })
    }
  }

  /**
   * Change the options of the Archiver Chart.
   * @param options - Chart options.
   * @param pv_name - name of the PV being analised.
   * @returns options
   */
  handleOptions(options: Chart.ChartOptions, pv_name: string|string[]): Chart.ChartOptions {
    const scalesOpt: undefined|ScaleType = options.scales;
    if(options.plugins){
      options.plugins.title = {
        display: true,
        text: "Integrated Dose",
        font: {
          size: 15
        }
      }
    }
    if(scalesOpt){
      scalesOpt.y = {
        display: true,
        title: {
          display: true,
          text: "μSv"
        }
      }
    }
    return options;
  }


  render() {
    return (
      <S.ChartWrapper>
        <EpicsChart
          pv_name={this.props.pv_name}
          data={{}}
          alert={led_limits.alert}
          alarm={led_limits.alarm}
          popup={this.props.popup}
          pvs_data={this.props.pvs_data}
          color_axis={this.state.color_axis}
          configOptions={this.handleOptions}/>
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

export default BarChart;
