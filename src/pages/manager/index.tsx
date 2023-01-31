import React, { useState } from "react";
import Footer from "../../components/Footer";
import DetectorList from "../../components/DetectorList";
import * as S from './styled';
import Navigation from "../../components/Navigation";
import DetectorEdit from "../../components/DetectorEdit";
import Login from "../../components/Login";
import Detectors_List from "../../controllers/pvs_data";

const ManagerPage: React.FC = () => {
  const detectorList: Detectors_List = new Detectors_List();
  const [detector, setDetector] = useState<string>("Thermo5");
  const [modal, setModal] = useState<boolean>(true);

  return (
    <S.Background>
      <Login/>
      <S.Title>
        Radiation Detector Manager
      </S.Title>
      <DetectorList
        selDet={setDetector}
        setModal={setModal}
        pvs_data={detectorList.get_detectors()}/>
      <DetectorEdit
        visible={modal}
        close={setModal}
        detector={detector}
        dataList={detectorList.get_detectors()}
        pvs_data={detectorList.get_detectors()}/>
      <Navigation
        value={"rad"}/>
      <Footer value={false}/>
    </S.Background>
  );
};

export default ManagerPage;
