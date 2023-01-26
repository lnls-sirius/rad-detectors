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
    value: null|number|string,
    datatype: null|string,
    count: null|number
}

interface DictEpicsData {
    [key: string]: EpicsData
}

interface PvsRadInterface {
    [key: string]: {
        [key: string]: string
    }
}

export type {
    ArchiverDataPoint,
    ArchiverData,
    DataAccess,
    DataAccessFactory,
    EpicsData,
    DictEpicsData,
    PvsRadInterface
}
