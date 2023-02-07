import React, {useEffect, useState } from "react";
import Footer from "../../components/Footer";
import DetectorList from "../../components/DetectorList";
import * as S from './styled';
import Navigation from "../../components/Navigation";
import DetectorEdit from "../../components/DetectorEdit";
import Login from "../../components/Login";
import { PageInterface } from "../../assets/interfaces/components";
import { PvsRadInterface } from "../../assets/interfaces/access-data";
import { DDictStr } from "../../assets/interfaces/patterns";
import { iconList } from "../../assets/icons";

const ManagerPage: React.FC<PageInterface> = (props) => {
  const [detector, setDetector] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [data, setData] = useState<PvsRadInterface>({});

  useEffect(() => {
    setData(props.pvs_data);
  }, [props.pvs_data]);

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

export default ManagerPage;
