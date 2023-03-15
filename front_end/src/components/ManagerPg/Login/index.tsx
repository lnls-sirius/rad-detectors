import React, { useState } from "react";
import { SHA256 } from "crypto-js";
import InteractionResponse from "../../../components/ManagerPg/Response";
import users from "../../../assets/files/user.json";
import { iconList } from "../../../assets/icons";
import { CloseIcon } from "../../../assets/themes";
import * as S from './styled';

/**
 * Authentication feature for the manager page.
 */
const Login: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(false);
  const [tentative, setTentative] = useState<boolean>(false);

  /**
   * Test User and Password combination.
   */
  function login(): void {
    const start: string = "rad_det";
    Object.entries(users).map(([usrn, pswd]: [string, string]) => {
      const hash = SHA256(start+password+user);
      if(hash.toString() == pswd && usrn == user){
        setLogged(true);
      }
    })
    setTentative(!tentative);
  }

  /**
   * Verify login with the enter button
   * @param event Keydown event
   */

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  if(!logged){
    return (
      <S.SecLayer
        onKeyDown={handleKeyDown}>
          <InteractionResponse
            message="Invalid Username or Password!"
            value={tentative}/>
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
