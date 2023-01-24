import { ChildrenInterface } from "./patterns";

interface PvListInterface {
    pv_list: Array<string>
}

interface PvInterface {
    pv_name: string,
    egu?: string,
    updateInterval?: number,
    modifyValue?: (value: string, pvname?: string) => any;
}

interface PvListMonitor {
    pv_name: string[],
    modifyValue: (value: string, pvname?: string) => void,
    updateInterval?: number
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


export type {
    LedStatus,
    PvListMonitor,
    LedPv,
    LabelPv,
    PvListInterface,
    PvTooltipInterface,
    ModelLocations,
    SimpleInfoInterface,
    ModalInterface
}
