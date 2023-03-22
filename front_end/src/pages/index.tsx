import { useEffect, useState } from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import ManagerPage from "./manager";
import ModelPage from "./model";
import MonitorPage from "./monitor";
import Detectors_List from "../controllers/pvs_data";
import { PvsRadInterface } from "../assets/interfaces/access-data";


/**
 * Allows the navigation between the 3 main page components.
 *
 * @param data - Stores the configuration data for the radiation detectors.
 * @param detectorsList - Store an object for loading and saving changes
 * on the radiation detectors configuration.
 *
 * @returns Page Component <ModelPage, MonitorPage, ManagerPage>
 */
const RouterNavigator: React.FC = () => {
  const [data, setData] = useState<PvsRadInterface>({});
  const detectorsList: Detectors_List = new Detectors_List();

  /**
   * Fetch configuration data on load or radiation detectors configuration modifications.
   */
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
          pvs_data={data}/>
      }/>
      <Route  path="/model" element={
        <ModelPage
          pvs_data={data}/>
      }/>
      <Route  path="/monitor" element={
        <MonitorPage
          pvs_data={data}/>
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
