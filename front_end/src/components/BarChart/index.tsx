import { Component } from "react";
import 'chartjs-adapter-moment';
import { SiriusChart } from "sirius-epics-react";
import { getAxisColors, simplifyLabel } from "../../controllers/chart";
import { led_limits } from "../../assets/constants";
import { BarChartInterface, BarChartState } from "../../assets/interfaces/components";
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
    const label_list: string[] = this.generate_labels(pv_list);
    this.handleBarState = this.handleBarState.bind(this);
    this.state = {
      color_axis: this.loadAxisColors(label_list),
      pv_list: pv_list,
      labels: label_list
    }
  }

  /**
   * Builds a list of all the colors representing the detectors
   * that are displayed in the x axis.
   * @returns List of the colors of the x axis in the chart
   */
  loadAxisColors(label_list: string[]): string[] {
    const sorted_list: string[] = this.sortList();
    let axis_col: string[] = [];
    Object.values(this.props.pvs_data).map((data: DictStr) => {
      const idx: number = sorted_list.indexOf(data["default_location"])
      axis_col[idx] = getAxisColors("dose_rate", data);
    })
    return axis_col
  }



  sortList(): string[] {
    let order_idx: string[] = [];
    let sorted_list: string[] = [];
    Object.values(this.props.pvs_data).map((data: DictStr) => {
      const loc = data["default_location"];
      const mod_loc = loc.slice(2, 4) + loc.slice(0, 2);
      order_idx.push(mod_loc)
    })
    sorted_list = order_idx.sort(
        (first: string, second: string) => {
            return String(first).localeCompare(String(second));
        }
    );
    return sorted_list.map((location: string)=>{
      return location.slice(2, 4) + location.slice(0, 2)
    })
  }

  /**
   * Get a list of all the integrated dose PVs in the radiation detectors configuration data
  */
  getPvList(): string[] {
    const sorted_list: string[] = this.sortList();
    let pv_list: string[] = [];
    Object.values(this.props.pvs_data).map((data: DictStr) => {
      const idx_name = sorted_list.indexOf(data["default_location"])
      pv_list[idx_name] = data["integrated_dose"]
    })
    return pv_list
  }


  /**
   * Load axis colors if not loaded
   */
  componentDidUpdate(prevProps: BarChartInterface, prevState: any): void {
    const pv_list: string[] = this.getPvList()
    const label_list: string[] = this.generate_labels(pv_list)
    const color: string[] = this.loadAxisColors(label_list)
    console.log(color)
    if(prevState.color_axis.length != color.length ||
        prevState.pv_list.length != pv_list.length) {
      this.setState({
        color_axis: color,
        pv_list: pv_list,
        labels: label_list
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
    options.scales.x.display = false;
    return options;
  }

  location_text(det_data: DictStr, name: string): string {
    const location_code: string = det_data["default_location"];
    const axis: string = location_code.slice(2, 4);
    let det_label: string = "SI-";

    if(location_code.includes('cs')){
      if(name == "Thermo 10"){
        det_label += 'Chicane 18'
      }else if(name == 'Berthold'){
        det_label += "COR_SRV" + axis;
      }else{
        det_label += "RACK" + axis;
      }
    }
    if(location_code.includes('ha')){
      det_label += "HALL" + axis;
    }
    if(location_code.includes('bo')){
      det_label += "BOOSTER" + axis;
    }
    if(location_code.includes('ro')){
      det_label += "ROOF" + axis;
    }
    det_label += '-'
    det_label += det_data["probe"].toUpperCase()
    det_label += name[0].toUpperCase()
    return det_label
  }

  generate_labels(pv_list: string[]): string[] {
    let labels: string[] = [];
    pv_list.map((pvname: string, idx: number) => {
      const simple_name: string = simplifyLabel(pvname);
      const det_data: DictStr = this.props.pvs_data[simple_name];
      if (det_data !== undefined){
        labels[idx] = this.location_text(
          det_data, simple_name);
      }else{
        labels[idx] = simple_name;
      }
    })
    return labels
  }

  render() {
    return (
      <S.ChartWrapper data-testid="bar-chart">
        {this.state.color_axis}
        <SiriusChart
          pv_name={this.state.pv_list}
          threshold={led_limits}
          modifyValue={this.handleBarState}
          modifyOptions={this.handleOptions}
          color_label={this.state.color_axis}
          label={this.state.labels}/>
      </S.ChartWrapper>
    )
  }
}

export default BarChart;
