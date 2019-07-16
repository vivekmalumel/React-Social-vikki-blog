import React, { Component } from 'react'
import axios from 'axios'
import LoginImg from '../images/icons8-user-96.png'
const styles={
    loginform:{
        background:"var(--primary)",
        color:"#fff",
        padding:"20px 35px",
        borderRadius:"30px",
    }
}
export default class login extends Component {
    state={
        email:'',
        password:'',
        loading:false,
        errors:{}
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
        this.setState({
            errors:{
                ...this.state.errors,
                [event.target.name]:''
            }
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        this.setState({
            loading:true
        })
        const userData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post('/login',userData)
        .then(response=>{
            console.log(response.data);
            this.setState({
                loading:false
            })
            localStorage.setItem('fbIdToken',`Bearer ${response.data.token}`)
            this.props.history.push('/');
        })
        .catch(err=>{
            console.log(err.response.data);
            this.setState({
                errors:err.response.data,
                loading:false
            })
        })
    }
    render() {
        const {errors}=this.state;
        return (
            <div className="mt-2">
                <h2 className="text-center text-primary font-weight-bold">Login Here</h2>
                <div className="text-center"><img src={LoginImg} alt="login" style={{width:"80px"}}/></div>
                <div className="col-sm-6 col-12 m-auto">
                    <form noValidate onSubmit={this.handleSubmit} style={styles.loginform}>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="email"><b>Email</b></label>
                            <input className={`form-control ${errors.email?'is-invalid':''}`}
                                type="text" 
                                name="email" 
                                placeholder="Enter Email Here"
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            {errors.email&&<span className="text-danger text-sm">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="password"><b>Password</b></label>
                            <input className={`form-control ${errors.password?'is-invalid':''}`}
                                type="password" name="password" 
                                placeholder="Enter Password Here"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                            {errors.password&&<span className="text-danger text-sm">{errors.password}</span>}
                        </div>
                        {errors.error&&<div className="mb-1 text-danger text-sm text-center">{errors.error}</div>}
                        <div className="form-group text-center">
                        <button type="submit" class="btn btn-light font-weight-bold"
                            disabled={this.state.loading}
                        >
                            Login
                        </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}
