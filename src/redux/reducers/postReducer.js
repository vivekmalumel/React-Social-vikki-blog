import { GET_POSTS,CHANGE_ACTIVE } from '../types'

const initialState={
    posts:[],
    activePage:0,
    totalCount:0
}

const postReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_POSTS:
            return{
                ...state,
                posts:action.payload.posts,
                totalCount:action.payload.totalCount
            }
        case CHANGE_ACTIVE:
            return{
                ...state,
                activePage:action.payload
            }
        default:
            return state;
    }
}

export default postReducer;