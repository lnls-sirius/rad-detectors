import React, { useEffect, useState } from "react";
import { AlertInterface } from "../../assets/interfaces/components";
import { simplifyLabel } from "../../controllers/chart";
import DetailedInfo from "../DetailedInfo";
import * as S from './styled';

const Alertlist: React.FC<AlertInterface> = (props) => {
  const [modal, setModal] = useState<boolean>(false);
  const [detector, setDetector] = useState<string>("ELSE");
  const [alerts, setAlerts] = useState<string[]>([]);
  const [alarms, setAlarms] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(handlePopupUpdate, 100);

    return () => clearInterval(interval);
  }, []);

  function handlePopupUpdate(): void {
    if(props.popup != undefined){
      setAlerts([...props.popup.get_alerts()]);
      setAlarms([...props.popup.get_alarms()]);
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
        <S.AlertItem
          value={true}
          type={type}
          onClick={
            ()=>handleWarnClick(pvname)}>
              {pvname}
        </S.AlertItem>
      );
    });
  }

  return (
    <S.ModalContainer>
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
