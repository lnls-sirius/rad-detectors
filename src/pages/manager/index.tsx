import React, { useState } from "react";
import Footer from "../../components/Footer";
import DetectorList from "../../components/DetectorList";
import * as S from './styled';
import Navigation from "../../components/Navigation";
import Popup_List from "../../controllers/alert";
import DetectorEdit from "../../components/DetectorEdit";
import Login from "../../components/Login";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import pvs_rad from "../../assets/backend_info/pvs_rad.json";

const ManagerPage: React.FC = () => {
  const [detectorList, setDetectorList] = useState<PvsRadInterface>(pvs_rad);
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
        dataList={detectorList}/>
      <DetectorEdit
        visible={modal}
        close={setModal}
        detector={detector}
        dataList={detectorList}/>
      <Navigation
        value={"rad"}
        popup={new Popup_List()}/>
      <Footer value={false}/>
    </S.Background>
  );
};

export default ManagerPage;
