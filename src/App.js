import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import home from './pages/home';
import login from './pages/login';
import dashboard from './pages/dashboard';
import notFound from './pages/notFound';
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode'
import AuthRoute from './utils/AuthRoute';
import {Provider} from 'react-redux';
import store from './redux/store'
import signup from './pages/signup';

let authenticated;
const token=localStorage.fbIdToken;
if(token){
  const decodedToken=jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href('/login');
    authenticated=false;
  }
  else{
    authenticated=true;
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <Router>
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path='/' component={home}/>
          <AuthRoute exact path='/login' component={login} authenticated={authenticated}/>
          <Route exact path='/dashboard' component={dashboard}/>
          <AuthRoute exact path='/signup' component={signup} authenticated={authenticated}/>
          <Route  path='*' component={notFound}/>
        </Switch>
        </div>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
