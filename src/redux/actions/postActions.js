import {LOADING_UI,GET_POSTS,CHANGE_ACTIVE,CLEAR_ERRORS,SET_ERRORS} from '../types'
import axios from 'axios'

export const getAllPosts=(start)=>dispatch=>{
    dispatch({type:LOADING_UI});

    axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`)
        .then((res)=>{
            // console.log(res.data);
            const payload={
                    posts:res.data,
                    totalCount:res.headers["x-total-count"]
            }
            dispatch({type:CLEAR_ERRORS})
            dispatch({type:GET_POSTS,payload});
        })
        .catch(err=>{
            console.log(err);
            dispatch({type:SET_ERRORS,payload:err.response.data})
        })
}

export const changeActivePage=(index)=>dispatch=>{
    dispatch({type:CHANGE_ACTIVE,payload:index})
}