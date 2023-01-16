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

interface DetailedInfo
        extends ChildrenInterface{
    details: boolean,
    close: () => void
}

export type {
    Coordinates,
    LedStatus,
    DictString,
    StateNum,
    StateStr,
    StateBool,
    ChildrenInterface,
    LedPv,
    LabelPv,
    PvListInterface,
    PvTooltipInterface,
    PvsRadInterface,
    DetailedInfo
}
