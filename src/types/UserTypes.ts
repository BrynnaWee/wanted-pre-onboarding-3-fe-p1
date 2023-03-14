export type LoginSuccessMessage = 'SUCCESS'
export type LoginFailMessage = 'FAIL'

export interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage
  token: string
}

export interface UserInfo {
  name:string
}

export interface User {
  username:string,
  password:string,
  userInfo:UserInfo
}