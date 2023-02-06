import Popup_List from "../../controllers/alert";
import Detectors_List from "../../controllers/pvs_data";
import { PvsRadInterface } from "./access-data";
import { ChildrenInterface, DictNum, PopupInterface, PvData, StateStr } from "./patterns";

interface PvListInterface {
    pv_list: Array<string>
}

interface PvInterface {
    pv_name: string | string[],
    egu?: string,
    updateInterval?: number,
    modifyValue?: (value: any, pvname?: string) => any;
}

interface LedStatus{
    state: number,
    shape: string
}

interface LedPv
    extends PvInterface {
        shape: string,
        alert?: number,
        alarm?: number
}

interface LabelPv
    extends PvInterface {
        state: string
}

interface PvTooltipInterface
    extends ChildrenInterface {
        text: string
}

interface ModelLocations {
    [key: string]: {
        y: number,
        x: number,
        region: string,
        axis: number
    }
}

interface SimpleInfoInterface
        extends ChildrenInterface, PvData{
    name: string,
    modal: boolean
}

interface ModalInterface extends PvData {
    name: string,
    modal: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>,
}

interface ArchChartInterface {
    pv_list: PvDataInterface[],
    data: Chart.ChartData,
    auto_update?: boolean,
    start_date?: Date,
    end_date?: Date,
    interval?: number,
    limits?: DictNum,
    optimization?: number,
    configOptions: (options: Chart.ChartOptions, pv_name: PvDataInterface[]) => any
}

interface PvDataInterface {
    name: string,
    label: string,
    color: string
}

interface AlertInterface
    extends PopupInterface, PvData{}


interface RadArchChartInterface extends PvData{
    pv_mon: string[],
    name: string[],
    limits?: DictNum,
    configOptions: (options: Chart.ChartOptions, pv_name: PvDataInterface[]) => any
}

interface EpicsChartInterface
    extends PvInterface {
        data: Chart.ChartData,
        alarm?: number,
        alert?: number,
        popup: Popup_List
}

interface NavInterface
    extends StateStr{}

interface PageInterface {
    pvs_data: PvsRadInterface,
    detectorsList: Detectors_List
}

export type {
    LedStatus,
    PvInterface,
    LedPv,
    LabelPv,
    PvListInterface,
    PvTooltipInterface,
    ModelLocations,
    SimpleInfoInterface,
    ModalInterface,
    ArchChartInterface,
    PvDataInterface,
    RadArchChartInterface,
    EpicsChartInterface,
    NavInterface,
    AlertInterface,
    PageInterface
}
