import React from "react";
import Controls from "../../components/Controls";
import Footer from "../../components/Footer";
import Model from "../../components/SiriusModel";
import * as S from './styled';

const ModelPage: React.FC = () => {

  return (
    <S.Background>
      <Controls value='model'/>
      <Model/>
      <Footer value={true}/>
    </S.Background>
  );
};

export default ModelPage;
