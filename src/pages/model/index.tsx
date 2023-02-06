import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Model from "../../components/SiriusModel";
import * as S from './styled';
import Popup_List from "../../controllers/alert";
import Alertlist from "../../components/Alert";
import Detectors_List from "../../controllers/pvs_data";
import { PvsRadInterface } from "../../assets/interfaces/access-data";

const ModelPage: React.FC = () => {
  const [data, setData] = useState<PvsRadInterface>({});
  const popup: Popup_List = new Popup_List();
  const detectorsList: Detectors_List = new Detectors_List();

  useEffect(() => {
    const fetchData = async()=> {
      await detectorsList.init();
      setData(detectorsList.get_detectors());
    }
    if(Object.keys(data).length === 0){
      fetchData();
    }
  }, [data]);

  return (
    <S.Background>
      <Navigation
        value='model'/>
      <Alertlist
        popup={popup}
        pvs_data={data}/>
      <Model
        popup={popup}
        pvs_data={data}/>
      <Footer value={true}/>
    </S.Background>
  );
};

export default ModelPage;
