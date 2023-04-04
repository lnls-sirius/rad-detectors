import { Component } from "react";
import 'chartjs-adapter-moment';
import { getAxisColors, simplifyLabel } from "../../controllers/chart";
import { Square } from "../../assets/themes";
import { led_limits } from "../../assets/constants";
import { BarChartInterface } from "../../assets/interfaces/components";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { ScaleType } from "../../assets/interfaces/patterns";
import * as S from './styled';
import { SiriusChart } from "sirius-epics-react";

/**
 * Implementation of a Bar ChM extends (<M>(value: M, pvname?: string[] | undefined) => M) | undefinedrt for the Integrated Dose Monitor
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
  handleOptions(options: any, pv_name: string[]|undefined): any {
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

  generate_labels(pv_list: string[]): string[] {
    let labels: string[] = [];
    pv_list.map((pvname: string, idx: number) => {
      labels[idx] = simplifyLabel(pvname)
    })
    return labels
  }

  render() {
    return (
      <S.ChartWrapper>
        <SiriusChart
          pv_name={this.props.pv_name}
          threshold={led_limits}
          modifyValue={this.handleOptions}
          label={this.generate_labels(this.props.pv_name)}/>
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
