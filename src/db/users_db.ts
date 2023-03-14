import { User } from './../types/UserTypes';

const userList = [
    {
        username:'blue',
        password:'1234',
        userInfo: {name:'myNameIsBLUE'}
    },{
        username:'red',
        password:'1234',
        userInfo: {name:'myNameIsRED'}
    },{
        username:'white',
        password:'1234',
        userInfo: {name:'myNameIsWHITE'}
    }
];

const _secret:string = '1234qwer!@#$';

export { userList, _secret };