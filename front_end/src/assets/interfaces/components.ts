import Popup_List from "../../controllers/alert";
import Detectors_List from "../../controllers/pvs_data";
import { ChildrenInterface, Coordinates, DictNum, PopupInterface, PvData, StateStr } from "./patterns";

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

interface BaseInfoInterface
        extends ChildrenInterface, PvData{
    name: string,
    modal: boolean
}

interface SimpleInfoInterface
    extends Coordinates, BaseInfoInterface {}

interface ModalInterface extends PvData {
    name: string,
    modal: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>,
}

interface ArchChartInterface {
    pv_list: PvDataInterface[],
    data: Chart.ChartData,
    auto_update?: boolean,
    updateInterval?: number,
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
    extends PvInterface, PopupInterface {
        data: Chart.ChartData,
        alarm?: number,
        alert?: number,
        color_axis: string[],
        configOptions: (options: Chart.ChartOptions, pv_name: string|string[]) => any
}

interface BarChartInterface
    extends PopupInterface, PvData {
        pv_name: string | string[]
}

interface NavInterface
    extends StateStr{}

interface PageInterface extends PvData {
    detectorsList: Detectors_List
}

interface DetListInterface {
    det_list: string[]
}

interface DetListProps extends PvData{
    selDet: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    deleteHandler: (detector: string) => void
}

interface EditDetInterface extends PvData {
    detector: string,
    detList: Detectors_List,
    close: React.Dispatch<React.SetStateAction<boolean>>
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
    BaseInfoInterface,
    ModalInterface,
    ArchChartInterface,
    PvDataInterface,
    RadArchChartInterface,
    BarChartInterface,
    EpicsChartInterface,
    NavInterface,
    AlertInterface,
    PageInterface,
    DetListInterface,
    DetListProps,
    EditDetInterface
}
