import React, { Component } from 'react'
import {connect} from 'react-redux'
import LoginImg from '../images/icons8-user-96.png';
import { signupUser } from '../redux/actions/userActions';
import {setError,clearErrors} from '../redux/actions/uiActions'

const styles={
    loginform:{
        background:"var(--primary)",
        color:"#fff",
        padding:"20px 35px",
        borderRadius:"30px",
    }
}

 class signup extends Component {

        state={
            email:'',
            password:'',
            confirmPassword:'',
            handle:''
        }
        handleChange=(event)=>{
            this.setState({
                [event.target.name]:event.target.value
            })
            const newErr={...this.props.UI.errors,[event.target.name]:''};
            this.props.setError(newErr);
        }
        handleSubmit=(event)=>{
            event.preventDefault();
            const userData={
                email:this.state.email,
                password:this.state.password,
                confirmPassword:this.state.confirmPassword,
                handle:this.state.handle
            }
            if(userData.password === userData.confirmPassword)
                this.props.signupUser(userData,this.props.history);
            else{
                const newErr={...this.props.UI.errors,error:'Password mismatch'};
                this.props.setError(newErr);
            }

        }
        componentWillUnmount=()=>{
            this.props.clearErrors();
        }

    render() {
        const {loading,errors}=this.props.UI;
        return (
            <div className="mt-2">
            <h2 className="text-center text-primary font-weight-bold">Signup Here</h2>
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
                    <div className="form-group">
                        <label className="col-form-label" htmlFor="confirmPassword"><b>Confirm Password</b></label>
                        <input className={`form-control ${errors.confirmPassword?'is-invalid':''}`}
                            type="password" name="confirmPassword" 
                            placeholder="Retype Password Here"
                            onChange={this.handleChange}
                            value={this.state.confirmPassword}
                        />
                        {errors.confirmPassword&&<span className="text-danger text-sm">{errors.confirmPassword}</span>}
                    </div>
                    <div className="form-group">
                        <label className="col-form-label" htmlFor="handle"><b>Handle</b></label>
                        <input className={`form-control ${errors.handle?'is-invalid':''}`}
                            type="text" name="handle" 
                            placeholder="Enter Handle"
                            onChange={this.handleChange}
                            value={this.state.handle}
                        />
                        {errors.handle&&<span className="text-danger text-sm">{errors.handle}</span>}
                    </div>

                    {errors.error&&<div className="mb-1 text-danger text-sm text-center">{errors.error}</div>}
                    <div className="form-group text-center">
                    <button type="submit" class="btn btn-light font-weight-bold"
                        disabled={loading}
                    >
                        Signup
                    </button>
                    </div>
                    
                </form>
            </div>
        </div>
    
        )
    }
}

const mapStateToProps=state=>({
    UI:state.UI
})

const mapDispatchToProps=dispatch=>({
    signupUser:(userData,history)=>dispatch(signupUser(userData,history)),
    setError:(error)=>dispatch(setError(error)),
    clearErrors:()=>dispatch(clearErrors())
})

export default connect(mapStateToProps,mapDispatchToProps)(signup);