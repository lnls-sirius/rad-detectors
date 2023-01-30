import React, { useState } from "react";
import { SHA256 } from "crypto-js";
import users from "../../assets/backend_info/user.json";
import { iconList } from "../../assets/icons";
import * as S from './styled';
import { CloseIcon } from "../../assets/themes";

const Login: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(true);

  function login(): void {
    const start: string = "rad_det";
    Object.entries(users).map(([usrn, pswd]: [string, string]) => {
      const hash = SHA256(start+password+user);
      if(hash.toString() == pswd && usrn == user){
        setLogged(true);
      }
    })
  }

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
              <CloseIcon
                icon={iconList['x']}/>
          </S.Nav>
        </S.Content>
      </S.SecLayer>
    )
  }
  return <div/>

};

export default Login;
