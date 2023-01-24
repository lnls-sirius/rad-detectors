import {
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";

interface Coordinates {
    x: number,
    y: number
}

interface DictStr {
    [key: string]: string
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

export type {
    Coordinates,
    DictStr,
    DictIcon,
    DictNum,
    StateNum,
    StateStr,
    StateBool,
    ChildrenInterface
}
