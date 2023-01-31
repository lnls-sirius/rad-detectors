import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Model from "../../components/SiriusModel";
import * as S from './styled';
import Popup_List from "../../controllers/alert";
import Alertlist from "../../components/Alert";
import Detectors_List from "../../controllers/pvs_data";

const ModelPage: React.FC = () => {
  const popup: Popup_List = new Popup_List();
  const detectorList: Detectors_List = new Detectors_List();

  return (
    <S.Background>
      <Alertlist
        popup={popup}
        pvs_data={detectorList.get_detectors()}/>
      <Model
        popup={popup}
        pvs_data={detectorList.get_detectors()}/>
      <Navigation
        value='model'/>
      <Footer value={true}/>
    </S.Background>
  );
};

export default ModelPage;
