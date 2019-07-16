import {createStore,applyMiddleware,combineReducers,compose} from 'redux'
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'
import postReducer from './reducers/postReducer'
const initialState={}
const middleware=[thunk];

const reducer=combineReducers({
    user:userReducer,
    UI:uiReducer,
    post:postReducer
})

const store=createStore(reducer,initialState,
    compose(applyMiddleware(...middleware)));

export default store;
