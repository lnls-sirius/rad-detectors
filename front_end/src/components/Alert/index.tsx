import React, { useEffect, useState } from "react";
import DetailedInfo from "../ModelPg/DetailedInfo";
import Popup_List from "../../controllers/alert";
import { simplifyLabel } from "../../controllers/chart";
import { AlertInterface } from "../../assets/interfaces/components";
import * as S from './styled';

/**
 * Show Cylics popup with the itens of the Alert and Alarm Lists
 * @param props
 * @param modal - State that determite if the popups will be shown
 * @param clock - Current date
 * @param detector - Detector selected on click in an item
 * @param alarms - Alarm list
 * @param alerts - Alert list
 * @param counter - Cyclic counter
 */
const defaultProps: AlertInterface = {
  pvs_data: {},
  popup: new Popup_List()
};

const Alertlist: React.FC<AlertInterface> = (props) => {
  const [modal, setModal] = useState<boolean>(false);
  const [clock, setClock] = useState<Date>(new Date());
  const [detector, setDetector] = useState<string>("ELSE");
  const [alerts, setAlerts] = useState<string[]>([]);
  const [alarms, setAlarms] = useState<string[]>([]);
  const [counter, setCounter] = useState<number>(0);

  /**
   * Set interval to check and update the alert/alarm list
   */
  useEffect(() => {
    const interval = setInterval(handlePopupUpdate, 100);
    return () => clearInterval(interval);
  }, [props.pvs_data, props.popup]);

  /**
   * Update alert/alarm list
   */
  function handlePopupUpdate(): void {
    if(props.popup != undefined){
      setAlerts([...props.popup.get_alerts()]);
      setAlarms([...props.popup.get_alarms()]);
      setClock(new Date());
      if(props.popup.get_flag()){
        setCounter(0);
        props.popup.set_flag(false);
      }else{
        setCounter(counter => counter+1);
      }
    }
  }

  /**
   * Show detailed information on click on an item
   */
  function handleWarnClick(pv_name: string): void {
    setDetector(pv_name);
    setModal(true);
  }

  /**
   * Show alert/alarm list UI
   */
  function show_list(list: string[], type: string): React.ReactElement[] {
    return list.map((pv_name: string)=>{
      const pvname: string = simplifyLabel(pv_name);
      return (
        <div>
          {(Math.floor(counter/100)%2 == 0)?
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
      <S.Clock>
        {clock.toLocaleString()}
      </S.Clock>
      <DetailedInfo
        name={detector}
        modal={modal}
        close={setModal}
        pvs_data={props.pvs_data}/>
      {show_list(alarms, "alarm")}
      {show_list(alerts, "alert")}
    </S.ModalContainer>
  );
};

Alertlist.defaultProps = defaultProps;
export default Alertlist;
