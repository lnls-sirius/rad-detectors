import {
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import ArchiverChart from "../../components/ArchiverChart";
import Popup_List from "../alert";
import { PvsRadInterface } from "./access-data";

interface Coordinates {
    x: number,
    y: number
}

interface DictStr {
    [key: string]: string
}

interface DDictStr {
    [key: string]: DictStr
}

interface DictEnumStr {
    [key: string]: string[]
}

interface DictNum {
    [key: string]: number
}

interface DictIcon {
    [key: string]: IconDefinition
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

interface PopupInterface {
    popup: Popup_List
}

interface PvData {
    pvs_data: PvsRadInterface
}

type RefChart = React.RefObject<HTMLCanvasElement>
type RefArchChart = React.RefObject<ArchiverChart>
type ScaleType = {
    [ḱey: string]: any
}

export type {
    Coordinates,
    DictStr,
    DDictStr,
    DictEnumStr,
    DictIcon,
    DictNum,
    StateNum,
    StateStr,
    StateBool,
    ChildrenInterface,
    PopupInterface,
    RefChart,
    RefArchChart,
    ScaleType,
    PvData
}
