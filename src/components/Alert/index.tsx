import React, { useEffect, useState } from "react";
import { AlertInterface } from "../../assets/interfaces/components";
import { simplifyLabel } from "../../controllers/chart";
import DetailedInfo from "../ModelPg/DetailedInfo";
import * as S from './styled';

const Alertlist: React.FC<AlertInterface> = (props) => {
  const [modal, setModal] = useState<boolean>(false);
  const [list_visible, setVisibility] = useState<boolean>(true);
  const [detector, setDetector] = useState<string>("ELSE");
  const [alerts, setAlerts] = useState<string[]>([]);
  const [alarms, setAlarms] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(handlePopupUpdate, 100);
    return () => clearInterval(interval);
  }, [props.pvs_data, props.popup]);

  function handlePopupUpdate(): void {
    if(props.popup != undefined){
      setAlerts([...props.popup.get_alerts()]);
      setAlarms([...props.popup.get_alarms()]);
      setCounter(counter => counter+1);
    }
  }

  function handleWarnClick(pv_name: string): void {
    setDetector(pv_name);
    setModal(true);
  }

  function show_list(list: string[], type: string): React.ReactElement[] {
    return list.map((pv_name: string)=>{
      const pvname: string = simplifyLabel(pv_name);
      return (
        <div>
          {(Math.ceil(counter/100)%2 == 0)?
            <S.AlertItem
            value={true}
            type={type}
            onClick={
              ()=>handleWarnClick(pvname)}>
                {pvname}
            </S.AlertItem>:<div/>
          }
        </div>
      );
    });
  }

  return (
    <S.ModalContainer>
      {counter}
      <DetailedInfo
        name={detector}
        modal={modal}
        close={setModal}
        pvs_data={props.pvs_data}/>
      {show_list(alerts, "alert")}
      {show_list(alarms, "alarm")}
    </S.ModalContainer>
  );
};
export default Alertlist;
