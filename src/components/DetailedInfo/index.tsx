import React from "react";
import {Chart, registerables} from 'chart.js';
import { ModalInterface } from "../../assets/interfaces";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import * as S from './styled';
import InfoBase from "../InfoBase";
import BaseChart from "../Chart";


const DetailedInfo: React.FC<ModalInterface> = (props) => {
  Chart.register(...registerables);

  function showModal(): React.ReactElement {
    if(props.modal){
      return(
        <S.ModalContainer
          value={props.modal}
          onClick={()=>props.close(false)}>
            <S.Content
              onClick={e => e.stopPropagation()}>
                <S.Close
                  icon={faXmark}
                  onClick={()=>props.close(false)}/>
                <S.Body>
                  <InfoBase
                    name={props.name}
                    modal={true}
                    children={null}/>
                  <BaseChart
                    id={0}
                    name={props.name}
                    data={{}}/>
                </S.Body>
            </S.Content>
          </S.ModalContainer>
      );
    }
    return <div/>;
  }

  return (
    <div>
      {showModal()}
    </div>
  )
};
export default DetailedInfo;
