import React, { useState } from "react";
import InteractionResponse from "../../../components/ManagerPg/Response";
import { login_ldap } from "../../../data-access/Ldap_auth";
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
  async function login(): Promise<void> {
    const start: string = "rad_det";
    const inGroup: boolean = await login_ldap(user, password, 'RAD');
    setLogged(inGroup);
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
            message="Invalid Email or Password!"
            value={tentative}/>
          <S.Content>
            <S.InputWrapper>
              Email:
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
