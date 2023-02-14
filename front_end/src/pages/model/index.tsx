import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Model from "../../components/ModelPg/SiriusModel";
import Alertlist from "../../components/Alert";
import Popup_List from "../../controllers/alert";
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

  return (
    <S.Background>
      <Navigation
        value='model'/>
      <Alertlist
        popup={popup}
        pvs_data={props.pvs_data}/>
      <Model
        popup={popup}
        pvs_data={props.pvs_data}/>
      <Footer value={true}/>
    </S.Background>
  );
};

ModelPage.defaultProps = defaultProps;
export default ModelPage;
