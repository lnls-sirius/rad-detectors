import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Model from "../../components/SiriusModel";
import * as S from './styled';
import Popup_List from "../../controllers/alert";
import Alertlist from "../../components/Alert";
import { PageInterface } from "../../assets/interfaces/components";

const ModelPage: React.FC<PageInterface> = (props) => {
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

export default ModelPage;
