import React, { useEffect, useState } from "react";
import { PopupInterface } from "../../assets/interfaces/patterns";
import { simplifyLabel } from "../../controllers/chart";
import * as S from './styled';

const Alertlist: React.FC<PopupInterface> = (props) => {
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

  function show_list(list: string[], type: string): React.ReactElement[] {
    return list.map((pv_name: string)=>{
      return (
        <S.AlertItem
          value={true}
          type={type}>
            {simplifyLabel(pv_name)}
        </S.AlertItem>
      );
    });
  }

  return (
    <S.ModalContainer>
      {show_list(alerts, "alert")}
      {show_list(alarms, "alarm")}
    </S.ModalContainer>
  );
};
export default Alertlist;
