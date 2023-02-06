import {
    Routes,
    Route
  } from "react-router-dom";
import { useEffect, useState } from "react";
import ManagerPage from "./manager";
import ModelPage from "./model";
import MonitorPage from "./monitor";
import Detectors_List from "../controllers/pvs_data";
import { PvsRadInterface } from "../assets/interfaces/access-data";

const RouterNavigator: React.FC = () => {
  // Manage the routing of the pages
  const [data, setData] = useState<PvsRadInterface>({});
  const detectorsList: Detectors_List = new Detectors_List();

  useEffect(() => {
    const fetchData = async()=> {
      await detectorsList.init();
      setData(detectorsList.get_detectors());
    }
    if(Object.keys(data).length === 0){
      fetchData();
    }
  }, [data]);

  return (
    <Routes>
      <Route  path="/" element={
        <ModelPage
          pvs_data={data}
          detectorsList={detectorsList}/>
      }/>
      <Route  path="/model" element={
        <ModelPage
          pvs_data={data}
          detectorsList={detectorsList}/>
      }/>
      <Route  path="/monitor" element={
        <MonitorPage
          pvs_data={data}
          detectorsList={detectorsList}/>
      }/>
      <Route  path="/rad" element={
        <ManagerPage
          pvs_data={data}
          detectorsList={detectorsList}/>
      }/>
    </Routes>
  );
}

export default RouterNavigator;
