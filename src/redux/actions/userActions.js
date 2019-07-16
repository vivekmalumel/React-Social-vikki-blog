import {SET_ERRORS,CLEAR_ERRORS,LOADING_UI,SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types'
import axios from 'axios';

export const loginUser=(userData,history)=>(dispatch)=>{
    //console.log('action caught');
    dispatch({type:LOADING_UI});
    axios.post('/login',userData)
        .then(response=>{
            
            localStorage.setItem('fbIdToken',`Bearer ${response.data.token}`);
            dispatch({type:CLEAR_ERRORS});
            dispatch({type:SET_AUTHENTICATED})
            history.push('/');
        })
        .catch(err=>{
            //console.log(err.response.data);
            dispatch({type:SET_ERRORS,payload:err.response.data})
        })
}

export const signupUser=(userData,history)=>(dispatch)=>{
    dispatch({type:LOADING_UI});
    axios.post('/signup',userData)
        .then(response=>{
            //console.log(response.data);
            localStorage.setItem('fbIdToken',`Bearer ${response.data.token}`);
            dispatch({type:CLEAR_ERRORS})
            dispatch({type:SET_AUTHENTICATED})
            history.push('/');
        })
        .catch(err=>{
            //console.log(err.response.data);
            dispatch({type:SET_ERRORS,payload:err.response.data})
        })
}

export const logoutUser=()=>dispatch=>{
    localStorage.removeItem('fbIdToken');
    dispatch({type:SET_UNAUTHENTICATED});
    //window.location.href='/login';
    //alert('test');
}

export const setLogin=()=>dispatch=>{
    dispatch({type:SET_AUTHENTICATED})
}