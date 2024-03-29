import React, { useEffect, useState } from "react";
import * as S from './styled';


const InteractionResponse: React.FC<any> = (props) => {
  const [modal, setModal] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(false);

  useEffect(() => {
    if(first){
      setModal(true);
    }
    setFirst(true);
    const timer = setTimeout(() => {
      setModal(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [props.value])

  return (
    <S.ModalContainer>
      {modal?
        <S.AlertItem value={modal}>
          {props.message}
        </S.AlertItem>:""}
    </S.ModalContainer>
  );
};


export default InteractionResponse;
