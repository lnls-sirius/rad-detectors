import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Model from "../../components/SiriusModel";
import * as S from './styled';
import Popup_List from "../../controllers/alert";

const ModelPage: React.FC = () => {
  const popup: Popup_List = new Popup_List();

  return (
    <S.Background>
      <Navigation
        value='model'
        popup={popup}/>
      <Model
        popup={popup}/>
      <Footer value={true}/>
    </S.Background>
  );
};

export default ModelPage;
