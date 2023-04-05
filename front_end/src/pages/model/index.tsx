import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Model from "../../components/ModelPg/SiriusModel";
import Alertlist from "../../components/Alert";
import Popup_List from "../../controllers/alert";
import DetailedInfo from "../../components/ModelPg/DetailedInfo";
import { PvData } from "../../assets/interfaces/patterns";
import * as S from './styled';

/**
 *
 * The model page shows a diagram where its possible to access the detailed
 * information of all the radiation detectors.
 *
 * @param props
 *  - pvs_data: Contains the radiation detectors configuration data
 * @param popup - Stores an object for monitoring and registering alerts and alarms.
 *
 * @returns Page Component
 */

const defaultProps: PvData = {
  pvs_data: {}
};

const ModelPage: React.FC<PvData> = (props) => {
  const popup: Popup_List = new Popup_List();
  const [modal, setModal] = useState<boolean>(false);
  const [detector, setDetector] = useState<string>("ELSE");

  return (
    <S.Background>
      <DetailedInfo
        name={detector}
        modal={modal}
        close={setModal}
        pvs_data={props.pvs_data}/>
      <Navigation
        value='model'/>
      <Alertlist
        popup={popup}
        pvs_data={props.pvs_data}
        setModal={setModal}
        setDetector={setDetector}/>
      <Model
        popup={popup}
        pvs_data={props.pvs_data}
        setModal={setModal}
        setDetector={setDetector}/>
      <Footer value={true}/>
    </S.Background>
  );
};

ModelPage.defaultProps = defaultProps;
export default ModelPage;
