import React, { useState } from "react";
import { ChromePicker } from 'react-color';
import { SHA256 } from "crypto-js";
import users from "../../assets/backend_info/user.json";
import Footer from "../../components/Footer";
import DetectorList from "../../components/DetectorList";
import * as S from './styled';
import Navigation from "../../components/Navigation";
import Popup_List from "../../controllers/alert";
import { iconList } from "../../assets/icons";

const ManagerPage: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000000");

  function login(): void {
    const start: string = "rad_det";
    Object.entries(users).map(([usrn, pswd]: [string, string]) => {
      const hash = SHA256(start+password+user);
      if(hash.toString() == pswd && usrn == user){
        setLogged(true);
      }
    })
  }

  function securityLayer(): React.ReactElement {
    if(!logged){
      return (
        <S.SecLayer>
          <S.Content>
            <S.InputWrapper>
              Username:
              <input type="text"
                onChange={
                  (evt: any)=>setUser(evt.target.value)}
                value={user}/>
            </S.InputWrapper>
            <S.InputWrapper>
              Password:
              <input type="password"
                onChange={
                  (evt: any)=>setPassword(evt.target.value)}
                value={password}/>
            </S.InputWrapper>
            <S.Login
              onClick={login}>
                Log In
            </S.Login>
            <S.Nav
              to={{pathname: "/model"}}>
                <S.Close
                  icon={iconList['x']}/>
            </S.Nav>
          </S.Content>
        </S.SecLayer>
      )
    }
    return <div/>
  }

  return (
    <S.Background>
      {securityLayer()}

      {/* <ChromePicker
        color={color}
        onChange={
          (color: any)=>{
            setColor(color.rgb);
          }}/> */}
      <DetectorList/>
      <Navigation
        value={"rad"}
        popup={new Popup_List()}/>
      <Footer value={false}/>
    </S.Background>
  );
};

export default ManagerPage;
