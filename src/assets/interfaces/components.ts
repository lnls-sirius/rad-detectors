import Popup_List from "../../controllers/alert";
import { ChildrenInterface, DictNum, PopupInterface, StateStr } from "./patterns";

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
        extends ChildrenInterface{
    name: string,
    modal: boolean
}

interface ModalInterface {
    name: string,
    modal: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>
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

interface RadArchChartInterface {
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
    extends StateStr, PopupInterface{}

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
    NavInterface
}
