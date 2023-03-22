import { Component } from "react";
import 'chartjs-adapter-moment';
import EpicsChart from "../EpicsReact/EpicsChart";
import { getAxisColors } from "../../controllers/chart";
import { Square } from "../../assets/themes";
import { led_limits } from "../../assets/constants";
import { BarChartInterface } from "../../assets/interfaces/components";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { ScaleType } from "../../assets/interfaces/patterns";
import * as S from './styled';

/**
 * Implementation of a Bar Chart for the Integrated Dose Monitor
 * @param props
 *  - pv_name: The name of the pvs to be displayed in the chart.
 *  - popup: Popup object to monitor alerts and alarms
 *  - pvs_data: Configuration data of the RAD Detectors
 * @param color_axis - The list of the axis colors in the chart.
 */
class BarChart extends Component<BarChartInterface, {color_axis: string[]}>{

  constructor(props: BarChartInterface){
    super(props);
    this.state = {
      color_axis: this.loadAxisColors()
    }
  }

  /**
   * Builds a list of all the colors representing the detectors
   * that are displayed in the x axis.
   * @returns List of the colors of the x axis in the chart
   */
  loadAxisColors(): string[] {
    let axis_col: string[] = [];
    Object.keys(this.props.pvs_data).map((pvname: string, idx: number) => {
      axis_col[idx] = getAxisColors(
        "dose_rate", this.props.pvs_data[pvname as keyof PvsRadInterface]);
    })
    axis_col[axis_col.length + 1] = "#ff00000"
    return axis_col
  }

  // Load axis colors if not loaded
  componentDidUpdate(): void {
    if(this.state.color_axis.length < 3){
      this.setState({
        color_axis: this.loadAxisColors()
      })
    }
  }

  /**
   * Change the options of the EPICS Chart.
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
