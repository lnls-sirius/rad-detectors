import {
    faChartColumn, faChartLine, faXmark, faRadiationAlt
} from "@fortawesome/free-solid-svg-icons";
import { DictIcon } from "./interfaces/patterns";

const iconList: DictIcon = {
    "line_chart": faChartLine,
    "bar_chart": faChartColumn,
    "x": faXmark,
    "model": faRadiationAlt
}

export {
    iconList
}
