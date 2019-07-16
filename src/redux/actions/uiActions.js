import { CLEAR_ERRORS, SET_ERRORS } from "../types";


export const clearErrors=()=>dispatch=>{
    dispatch({type:CLEAR_ERRORS})
}

export const setError=(error)=>dispatch=>{
    //console.log(error);
    dispatch({type:SET_ERRORS,payload:error})
}