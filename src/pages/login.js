import React, { Component } from 'react'
import LoginImg from '../images/icons8-user-96.png'
import {connect} from 'react-redux';
import  {loginUser} from '../redux/actions/userActions'
import {clearErrors} from '../redux/actions/uiActions'
import { setError } from '../redux/actions/uiActions';

const styles={
    loginform:{
        background:"var(--primary)",
        color:"#fff",
        padding:"20px 35px",
        borderRadius:"30px",
    }
}
class login extends Component {
    state={
        email:'',
        password:''
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
            password:this.state.password
        }
        this.props.loginUser(userData,this.props.history);
    }

    componentWillUnmount=()=>{
        this.props.clearErrors();
    }

    render() {
        const {loading,errors}=this.props.UI;
        //console.log('render');
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
                            disabled={loading}
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

const mapStateToProps=(state)=>({
    user:state.user,
    UI:state.UI
});

const mapActionsToProps=(dispatch)=>({
    loginUser:(userData,history)=>dispatch(loginUser(userData,history)),
    clearErrors:()=>dispatch(clearErrors()),
    setError:(errors)=>dispatch(setError(errors))
})

export default  connect(mapStateToProps,mapActionsToProps)(login);