import React from "react";
import Controls from "../../components/Controls";
import * as S from './styled';

const MonitorPage: React.FC = () => {

  return (
    <S.Background>
      <Controls value="monitor"/>
    </S.Background>
  );
};

export default MonitorPage;
