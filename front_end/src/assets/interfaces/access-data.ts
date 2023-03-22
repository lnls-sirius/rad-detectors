import { DictStr } from "./patterns";

interface ArchiverDataPoint {
    x: Date;
    y: number;
}

interface ArchiverData {
    meta: { name: string; PREC: string };
    data: ArchiverDataPoint[];
}

interface ArchDatasetDict {
    [key: string]: ArchiverDataPoint[]
}

interface DataAccess {
    fetchData(pv: string, from: Date, to: Date, optimization: number): Promise<ArchiverData>;
}

interface DataAccessFactory {
  (): DataAccess;
}

interface PvsRadInterface {
    [key: string]: DictStr
}

export type {
    ArchDatasetDict,
    ArchiverDataPoint,
    ArchiverData,
    DataAccess,
    DataAccessFactory,
    PvsRadInterface
}
