import axios from "axios";
import { JSEncrypt } from "jsencrypt";
import { DictStr } from "../../assets/interfaces/patterns";
import { public_key, public_key_api, private_key } from "../../assets/keys";
import { Buffer } from "buffer";

function encrypt_request(login_data: DictStr, public_key_api: string): DictStr {
  let encrypted_data: DictStr = {};
  let cipher = new JSEncrypt({
    default_key_size: "2048"
  });
  cipher.setPublicKey(public_key_api);
  Object.entries(login_data).map(([key, value]: [string, string])=>{
    let value_enc: string = "";
    if (key != "public_key"){
      const value_latin1 = Buffer.from(value, 'latin1');
      const encrypted_result = cipher.encrypt(value);
      if(encrypted_result){
        value_enc = encrypted_result;
      }
    }else{
      value_enc = value;
    }
    encrypted_data[key] = value_enc;
  })
  return encrypted_data
}

async function login_ldap(username: string, password: string, group: string): Promise<string> {
  const jsonurl:string = `${window.location.protocol}//ldap-auth-api.lnls.br/group`;
  const login_data: DictStr = {
    username: username,
    password: password,
    group: group,
    public_key: public_key_api
  }

  const encrypted: DictStr = encrypt_request(login_data, public_key_api)
  const encrypt_string: string = JSON.stringify(encrypted)
  const buffer =  Buffer.from(encrypt_string, "latin1")
  return await axios
    .post(jsonurl, {
        method: "post",
        timeout: 2000,
        data: buffer,
        headers : {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*'
        },
    })
    .then((res) => {
      console.log(res.data)
      return res.data;
    })
}

export {
  login_ldap
}
