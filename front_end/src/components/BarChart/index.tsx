import { Component } from "react";
import 'chartjs-adapter-moment';
import { SiriusChart } from "sirius-epics-react";
import { getAxisColors, simplifyLabel } from "../../controllers/chart";
import { Square } from "../../assets/themes";
import { led_limits } from "../../assets/constants";
import { BarChartInterface, BarChartState } from "../../assets/interfaces/components";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { DictStr, ScaleType } from "../../assets/interfaces/patterns";
import * as S from './styled';

/**
 * Implementation of a Bar ChM extends (<M>(value: M, pvname?: string[] | undefined) => M) | undefinedrt for the Integrated Dose Monitor
 * @param props
 *  - pv_name: The name of the pvs to be displayed in the chart.
 *  - popup: Popup object to monitor alerts and alarms
 *  - pvs_data: Configuration data of the RAD Detectors
 * @param color_axis - The list of the axis colors in the chart.
 */
class BarChart extends Component<BarChartInterface, BarChartState>{

  constructor(props: BarChartInterface){
    super(props);
    const pv_list: string[] = this.getPvList();
    this.handleBarState = this.handleBarState.bind(this);
    this.state = {
      color_axis: this.loadAxisColors(),
      pv_list: pv_list,
      labels: this.generate_labels(pv_list)
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
    return axis_col
  }

  /**
   * Get a list of all the integrated dose PVs in the radiation detectors configuration data
  */
  getPvList(): string[] {
    let pv_list: string[] = [];
    Object.values(this.props.pvs_data).map((data: DictStr, idx_name: number) => {
      pv_list[idx_name] = data["integrated_dose"]
    })
    return pv_list
  }


  /**
   * Load axis colors if not loaded
   */
  componentDidUpdate(prevProps: BarChartInterface, prevState: any): void {
    const color: string[] = this.loadAxisColors()
    const pv_list: string[] = this.getPvList()
    if(prevState.color_axis.length != color.length ||
        prevState.pv_list.length != pv_list.length) {
      this.setState({
        color_axis: color,
        pv_list: pv_list,
        labels: this.generate_labels(pv_list)
      })
    }
  }

  /**
   * Watch for alert and alarm events.
   * @param value - Integrated dose measured by the PV.
   * @param pvname - PV name of the PV being measured.
   * @returns value without changes
   */
  handleBarState<T>(value: T, pvname: string): T {
    if(pvname && this.props.popup!==undefined){
      if(value < led_limits['alert']){
        this.props.popup.remove_alert(pvname);
      }else if(value >= led_limits['alert'] && value < led_limits['alarm']){
        this.props.popup.add_alert(pvname);
      }else if(value >= led_limits['alarm']){
        this.props.popup.add_alarm(pvname);
      }
    }
    return value
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
      <S.ChartWrapper data-testid="bar-chart">
        <SiriusChart
          pv_name={this.state.pv_list}
          threshold={led_limits}
          modifyValue={this.handleBarState}
          modifyOptions={this.handleOptions}
          label={this.state.labels}/>
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
