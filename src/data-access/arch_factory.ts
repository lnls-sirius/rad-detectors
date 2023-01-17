import { DataAccess, DataAccessFactory } from "../assets/interfaces";
import { ArchiverDataAccess } from "./EPICS/archiver";

const ArchiverDataAccessFactory: DataAccessFactory = () => {
    return new ArchiverDataAccess();
  };
const archInterface: DataAccess = ArchiverDataAccessFactory();
export default archInterface;
