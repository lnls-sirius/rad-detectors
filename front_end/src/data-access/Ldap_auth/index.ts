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

function decrypt_response(response_data: string): DictStr {
  let encrypted_data: DictStr = {};
  let cipher = new JSEncrypt({
    default_key_size: "2048"
  });
  cipher.setPrivateKey(private_key);
  Object.entries(response_data).map(([key, value]: any)=>{
    let value_enc: string = "";
    const new_val = Buffer.from(value).toString('latin1');
    const encrypted_result = cipher.decrypt(new_val);
    if(encrypted_result){
      value_enc = encrypted_result;
    }
    encrypted_data[key] = value_enc;
  })
  return encrypted_data
}

async function login_ldap(username: string, password: string, group: string): Promise<boolean> {
  const jsonurl:string = `${window.location.protocol}//ldap-auth-api.lnls.br/group`;
  const login_data: DictStr = {
    email: username,
    password: password,
    group: group,
    public_key: public_key
  }

  const encrypted: DictStr = encrypt_request(login_data, public_key_api)
  const encrypt_string: string = JSON.stringify(encrypted)
  return await axios
    .post(jsonurl, {
        method: "post",
        timeout: 2000,
        data: encrypt_string,
        headers : {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*'
        },
    })
    .then((res) => {
      let response_json: DictStr = decrypt_response(res.data);
      if(response_json["inGroup"] == "True"){
        return true;
      }
      return false;
    })
}

export {
  login_ldap
}
