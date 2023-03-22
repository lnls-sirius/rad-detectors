import {
    faChartColumn, faChartLine, faXmark, faRadiationAlt,
    faPencil, faTrash, faUser, faSave, faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { DictIcon } from "./interfaces/patterns";

// List of used icons
const iconList: DictIcon = {
    "line_chart": faChartLine,
    "bar_chart": faChartColumn,
    "x": faXmark,
    "model": faRadiationAlt,
    "edit": faPencil,
    "remove": faTrash,
    "manager": faUser,
    "save": faSave,
    "add": faPlusCircle
}

export {
    iconList
}
