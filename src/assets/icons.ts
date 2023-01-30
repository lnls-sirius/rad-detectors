import {
    faChartColumn, faChartLine, faXmark, faRadiationAlt,
    faPencil, faTrash, faUser, faSave
} from "@fortawesome/free-solid-svg-icons";
import { DictIcon } from "./interfaces/patterns";

const iconList: DictIcon = {
    "line_chart": faChartLine,
    "bar_chart": faChartColumn,
    "x": faXmark,
    "model": faRadiationAlt,
    "edit": faPencil,
    "remove": faTrash,
    "manager": faUser,
    "save": faSave
}

export {
    iconList
}
