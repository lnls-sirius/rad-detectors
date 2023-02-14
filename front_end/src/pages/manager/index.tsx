import React, {useEffect, useState } from "react";
import Footer from "../../components/Footer";
import DetectorList from "../../components/ManagerPg/DetectorList";
import Navigation from "../../components/Navigation";
import DetectorEdit from "../../components/ManagerPg/DetectorEdit";
import Login from "../../components/ManagerPg/Login";
import { PageInterface } from "../../assets/interfaces/components";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { DDictStr } from "../../assets/interfaces/patterns";
import { iconList } from "../../assets/icons";
import Detectors_List from "../../controllers/pvs_data";
import * as S from './styled';

/**
 *
 * Page protected by Login: Access authorization required
 *
 * The managet page allows the user to modificate the radiation
 * detectors configuration data.
 *
 * @param props
 *  - pvs_data: Contains the radiation detectors configuration data.
 *  - detectorsList: Contains an object that allows the interaction with the
 *  radiation detectors configuration data.
 *
 * @param detector - Name of the selected detector.
 * @param modal - State of the edit/add component.
 * @param data - Contains the radiation detectors configuration data.
 * Allows automatic UI changes from the changes made without having to
 * load from the configuration server.
 *
 * @returns Page Component
 */

const defaultProps: PageInterface = {
  pvs_data: {},
  detectorsList: new Detectors_List()
};

const ManagerPage: React.FC<PageInterface> = (props) => {
  const [detector, setDetector] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [data, setData] = useState<PvsRadInterface>({});

  /**
   *  Update data state on props.pvs_data change
   */
  useEffect(() => {
    setData(props.pvs_data);
  }, [props.pvs_data]);

  /**
   *  Delete the selected detector.
   *
   * @param detector - Name of a detector.
   */
  function handleDelete(detector: string): void {
    let newPvList: DDictStr = props.pvs_data;
    delete newPvList[detector];
    props.detectorsList.update_detectors(newPvList);
    setData({...newPvList});
  }

  return (
    <S.Background>
      <Login/>
      <S.Title>
        <S.AddIcon
          icon={iconList['add']}
          onClick={()=>{
            setModal(true);
            setDetector("")}
          }/>
        Radiation Detector Manager
      </S.Title>
      <DetectorList
        selDet={setDetector}
        setModal={setModal}
        deleteHandler={handleDelete}
        pvs_data={data}/>
      {modal?
      <DetectorEdit
        close={setModal}
        detector={detector}
        detList={props.detectorsList}
        pvs_data={data}/>:<div/>}
      <Navigation
        value={"rad"}/>
      <Footer value={false}/>
    </S.Background>
  );
};

ManagerPage.defaultProps = defaultProps;
export default ManagerPage;
