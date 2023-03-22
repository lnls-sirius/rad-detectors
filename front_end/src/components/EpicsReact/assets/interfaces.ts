import Popup_List from "./alert";

interface PvListInterface {
    pv_list: Array<string>
}

interface EpicsChartInterface
    extends PvInterface {
        popup: Popup_List,
        data: Chart.ChartData,
        alarm?: number,
        alert?: number,
        color_axis: string[],
        configOptions: (options: Chart.ChartOptions, pv_name: string|string[]) => any,
}

interface PvInterface {
    pv_name: string | string[],
    egu?: string,
    updateInterval?: number,
    modifyValue?: (value: any, pvname?: string) => any;
}

interface EpicsData {
    date: null|Date,
    value: null|number|string,
    datatype: null|string,
    count: null|number
}

interface DictEpicsData {
    [key: string]: EpicsData
}

interface PvTooltipInterface{
    text: string,
    children: React.ReactNode
}

interface LabelPv
    extends PvInterface {
        state: string
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

interface StateBool {
    value: boolean
}

interface StateNum {
    value: number
}

interface StateStr {
    value: string
}

interface DictStr {
    [key: string]: string
}

type RefChart = React.RefObject<HTMLCanvasElement>
type ScaleType = {
    [ḱey: string]: any
}

export type {
    PvListInterface,
    EpicsChartInterface,
    PvInterface,
    DictEpicsData,
    EpicsData,
    PvTooltipInterface,
    LabelPv,
    LedStatus,
    LedPv,
    StateBool,
    StateNum,
    StateStr,
    DictStr,
    RefChart,
    ScaleType
}
