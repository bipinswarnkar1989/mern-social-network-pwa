import { takeLatest, put, call } from 'redux-saga/effects';
import { API } from '../../utils/constants';
import Auth from '../../utils/auth';
import flushMessage from '../flushMessages';

const authObj = new Auth();

const sendRequest = async (credentials) => {
    try {
        let resp = await fetch(`${API}/users/userRegister`, {
            method:'post',
            body:JSON.stringify(credentials),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        });
        let json = await resp.json();
        return json;
    } catch (error) {
        alert(error.message);
       console.log(error);
    }
}

function *register(action){
    try {
        let response = yield call(sendRequest, action.payload);
        if (response.success) {
            yield put({
                type:'REGISTER_USER_SUCCESS',
                resp:response
            });console.log(response)
            authObj.setToken(response.token);
            action.history.push('/');
        }  else if (!response.success && response.message){
            yield put({
                type:'REGISTER_USER_FAILED',
                resp:response
            })
        }
    } catch (error) {
        alert(error.message);
    console.log(error);
    }
    yield call(flushMessage);
}

export default function *watchRegister(){
    yield takeLatest('REQUEST_USER_REGISTER', register);
}