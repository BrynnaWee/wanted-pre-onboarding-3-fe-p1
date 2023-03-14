import React, { useState } from 'react'
import * as USER_TYPE from '../types/UserTypes';
import {userList, _secret} from '../db/users_db';

const login = async(username: string, password: string): Promise<USER_TYPE.LoginResponse | null> => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
  //token은 _secret키를 따로 만들어야함.

  const targetUser:USER_TYPE.User|undefined = userList.find(user=>{
    return user.username===username&&user.password===password
  })

  return targetUser ? {message: 'SUCCESS', token: JSON.stringify({user:targetUser.userInfo, secret:_secret})}
    : {message: 'FAIL', token: null};

  /*순서 2번
  로그인 정보에 해당하는 회원을 검색해서, 아이디,비번이 일치하면
  SUCCESS메세지와 함께 token을 만들어서 보내줌(stringify로 string화 시킴)
  일치하지 않으면 FAIL 메시지를 보냄.
  */
}



const getUserInfo = async(token:string):Promise<USER_TYPE.UserInfo | null> => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.
  console.log('token',token);
  //username과 token을 받아서, 회원 db에서 user를 검색해 리턴해주는 함수임

  /*순서 4
  클라이언트에서 보내준 token을 가지고 유저 정보를 검색함.
  -> token은 string형태이므로 parse해서 다시 객체로 만든 다음 검색한다.
  -> 가장 먼저, token안의 secret키를 찾아서, 서버에서 보내준 것이 맞는 유효한 토큰인지 부터 검사한다.
  -> 유효한 토큰이 맞으면 회원을 검색한다.
  -> 해당 회원이 있으면 db에서 회원의 정보를 찾아서 리턴해준다.
  */

  const parsedToken = JSON.parse(token);
  console.log('parsedToken',parsedToken);
  if(!parsedToken?.secret || parsedToken?.secret!==_secret) return null;

  const loggedUser:USER_TYPE.User|undefined = userList.find((user:USER_TYPE.User)=>{
    console.log(user)
    if (user.userInfo?.name===parsedToken.user.name) return user;
  })

  return loggedUser? loggedUser.userInfo : null;
}



const Login = () => {

  const [userInfo, setUserInfo] = useState<USER_TYPE.UserInfo>({name:null});

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);
    const data:any = {};
    for (let [key, value] of formData.entries()) {
      // console.log(key, value);
      data[key]=value;
    }


    /*순서 1번
     로그인 폼의 데이터인 id와 pw를 login함수로 보냄(login api)
    */
  await login(data.username,data.password).then(async (result)=>{
      console.log('result',result);

      /*순서 3번
      login api에서 준 로그인 결과값을 가지고
      성공일 경우, 서버에서 받아온 token값을 넣어서 getUserInfo api를 호출함
      클라이언트에서 발급받은 토큰을, 사용자 인증정보를 받아오기 위해 서버에 다시 보내는 것임
      */
      switch(result.message){
        case 'SUCCESS' :
          const userInfo = await getUserInfo(result.token);

          /*순서 5
          서버에 토큰을 보내 받아온 회원 정보를 useState를 이용해 state에 저장해준다.
          */
          console.log('SUCCESS userInfo',userInfo)
          setUserInfo(userInfo);
          break;

        case 'FAIL' :
          throw new Error('아이디나 비번이 잘못되었습니다.');

        default :
        break;
      }
   });


  }

  return (<div>
    <h1>
      Login with Mock API
    </h1>
    <form onSubmit={loginSubmitHandler}>
      <label>
        Username:
        <input type="text" name="username"/>
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <input type="submit" value="Submit" />
      {/* TODO: 여기에 username과 password를 입력하는 input을 추가하세요. 제출을 위해 button도 추가하세요. */}
    </form>
    <div>
      <h2>
        User info
      </h2>
      {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
      {JSON.stringify(userInfo.name)}
    </div>
  </div>)
}

export default Login
