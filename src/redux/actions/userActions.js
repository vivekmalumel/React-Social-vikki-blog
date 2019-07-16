import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI} from '../types'
import axios from 'axios';

export const loginUser=(userData,history)=>(dispatch)=>{
    //console.log('action caught');
    dispatch({type:LOADING_UI});
    axios.post('/login',userData)
        .then(response=>{
            console.log(response.data);
            localStorage.setItem('fbIdToken',`Bearer ${response.data.token}`);
            dispatch({type:CLEAR_ERRORS})
            history.push('/');
        })
        .catch(err=>{
            //console.log(err.response.data);
            dispatch({type:SET_ERRORS,payload:err.response.data})
        })
}

export const signupUser=(userData,history)=>(dispatch)=>{
    console.log('action caught');
    axios.post('/signup',userData)
        .then(response=>{
            //console.log(response.data);
            localStorage.setItem('fbIdToken',`Bearer ${response.data.token}`);
            dispatch({type:CLEAR_ERRORS})
            history.push('/');
        })
        .catch(err=>{
            //console.log(err.response.data);
            dispatch({type:SET_ERRORS,payload:err.response.data})
        })
}