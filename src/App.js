import React from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import home from './pages/home';
import login from './pages/login';
import dashboard from './pages/dashboard';
import notFound from './pages/notFound';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode'
import {AuthRoute,ProtectedRoute} from './utils/AuthRoute';
import signup from './pages/signup';
import Loader from './components/Loader';
import {connect} from 'react-redux';
import store from './redux/store'
import {logoutUser,setLogin} from './redux/actions/userActions'

const token=localStorage.fbIdToken;
  if(token){
    const decodedToken=jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()){
      store.dispatch(logoutUser());
      window.location.href = '/login';
    }
    else{
      store.dispatch(setLogin());
    }
  }

function App(props) {
  const {UI:{loading}}=props;
  return (
      <div className="App">
        {loading && <Loader/>}
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path='/' component={home}/>
          <AuthRoute exact path='/login' component={login} authenticated={props.user.authenticated}/>
          <ProtectedRoute exact path='/dashboard' component={dashboard} authenticated={props.user.authenticated}/>
          <AuthRoute exact path='/signup' component={signup} authenticated={props.user.authenticated}/>
          <Route  path='*' component={notFound}/>
        </Switch>
        </div>
    </div>
  );
}
const mapStateToProps=state=>({
  UI:state.UI,
  user:state.user
})
export default connect(mapStateToProps)(App);
