import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Model from "../../components/SiriusModel";
import * as S from './styled';
import Popup_List from "../../controllers/alert";

const ModelPage: React.FC = () => {
  const popup: Popup_List = new Popup_List();

  return (
    <S.Background>
      <Model
        popup={popup}/>
      <Navigation
        value='model'
        popup={popup}/>
      <Footer value={true}/>
    </S.Background>
  );
};

export default ModelPage;
