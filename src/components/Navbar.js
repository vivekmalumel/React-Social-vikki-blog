import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class Navbar extends Component {
    state={
        isMenuOpen:false
    }
    toggleMenu=()=>{
        this.setState(prevState=>{
            return{
                isMenuOpen:!prevState.isMenuOpen
            }
        })
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Vikki's Blog</a>
            <button className="navbar-toggler" 
            onClick={this.toggleMenu}
            type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className={`collapse navbar-collapse ${ this.state.isMenuOpen ? 'show':'' }`} id="navbarColor01">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Pricing</NavLink>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search"/>>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
        )
    }
}
