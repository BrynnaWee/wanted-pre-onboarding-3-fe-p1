import React, { useState } from 'react'

type LoginSuccessMessage = 'SUCCESS'
type LoginFailMessage = 'FAIL'

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage
  token: string
}

const login = async(username: string, password: string): Promise<LoginResponse | null> => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
  if(!(username==='brynna'&&password==='1234')){
    console.log('실패');
    //token은 따로 만들어야함.
    return {message: 'FAIL', token: 'login_fail'};
  }

  console.log('성공');
  return {message: 'SUCCESS', token: 'login_sucess'};

  //어차피 getUserInfo를 회원db에서 검색해오는데, 프론트단에서 login함수에서 success,fail을 반환하지??
  //실습이라 그런가?
}

const getUserInfo = async(userInfo:{username:string,token:any}):Promise<{ username: string } | null> => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.
  console.log('userInfo',userInfo);
  //username과 token을 받아서, 회원 db에서 user를 검색해 리턴해주는 함수임
  return null
}

const Login = () => {

  const [userInfo, setUserInfo] = useState(null);

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);
    const data:any = {};
    for (let [key, value] of formData.entries()) {
      // console.log(key, value);
      data[key]=value;
    }

    // console.log(data);
   login(data.username,data.password).then((result)=>{
      console.log('result',result);
      switch(result.message){
        case 'SUCCESS' :
          const userInfo = getUserInfo({
            username:data.username,
            token : result.token,
          });

          if(userInfo) setUserInfo(userInfo);
          break;

        case 'FAIL' :
          throw new Error();
        break;

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
      {JSON.stringify({username: 'blueStragglr'})}
    </div>
  </div>)
}

export default Login
