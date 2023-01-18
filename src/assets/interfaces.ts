interface Coordinates {
    x: number,
    y: number
}

interface PvListInterface {
    pv_list: Array<string>
}

interface PvInterface {
    pv_name: string,
    egu?: string,
    updateInterval?: number,
    modifyValue?: (value: any) => any;
}

interface PvListMonitor {
    pv_name: string[],
    modifyValue: (key: string, value: string) => void,
    updateInterval?: number
}

interface LedStatus{
        state: number,
        shape: string
}

interface DictString {
    [key: string]: string
}

interface StateNum {
    value: number
}

interface StateStr {
    value: string
}

interface StateBool {
    value: boolean
}

interface ChildrenInterface {
    children: React.ReactNode
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

interface PvsRadInterface {
    [key: string]: {
        [key: string]: string
    }
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

interface ArchiverDataPoint {
    x: Date;
    y: number;
}

interface ArchiverData {
    meta: { name: string; PREC: string };
    data: ArchiverDataPoint[];
}

interface DataAccess {
    fetchData(pv: string, from: Date, to: Date, optimization: number): Promise<ArchiverData>;
}

interface DataAccessFactory {
  (): DataAccess;
}

interface EpicsData {
    date: null|Date,
    value: null|number,
    datatype: null|string,
    count: null|number
}

interface DictEpicsData {
    [key: string]: EpicsData
}

export type {
    Coordinates,
    LedStatus,
    DictString,
    StateNum,
    StateStr,
    StateBool,
    ChildrenInterface,
    PvListMonitor,
    LedPv,
    LabelPv,
    PvListInterface,
    PvTooltipInterface,
    PvsRadInterface,
    ModelLocations,
    SimpleInfoInterface,
    ModalInterface,
    ArchiverDataPoint,
    ArchiverData,
    DataAccess,
    DataAccessFactory,
    EpicsData,
    DictEpicsData
}
