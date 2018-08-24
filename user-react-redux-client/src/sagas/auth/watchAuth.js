import { takeLatest, put, call } from 'redux-saga/effects';
import { API } from '../../utils/constants';
import flushMessage from '../flushMessages';

const sendRequest = async (token) => {
    try {
     let resp = await fetch(`${API}/users/validateToken`, {
         method:'get',
         headers:{
             'Authorization': token,
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

 function *authenticate(action) {
     try {
         const response = yield call(sendRequest, action.token);
         if (response.success) {
             yield put({
                 type:'AUTH_SUCCESS',
                 resp:response
             });
             
         } else if (!response.success && response.message){
             console.log('AUTH_FAILED: '+ JSON.stringify(response))
             yield put({
                 type:'AUTH_FAILED',
                 resp:response
             });
             action.history.push('/login');
         }
     } catch (error) {
        alert(error.message);
        console.log(error);
     }
     yield call(flushMessage);
 }

 export default function *watchAuth(){
     yield takeLatest('REQUEST_AUTHENTICATION',authenticate);
 }