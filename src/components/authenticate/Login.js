import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../state/actions/auth'
// import housingLogo from '../../images/logo.png';
import housingLogo from '../../images/Captures.PNG';
import '../styles/Login.css';
import { useHistory } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '' 
    });
    let history = useHistory();
    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();

        login(username, password);
    };


    if (isAuthenticated) {
        history.push({
            pathname: '/' ,
    })}

    return (
        <div className='main-div'>
            <img
            src={housingLogo}
            className='logo'
            
            />
            <div className='login-form'>
            <h1 className='login-instructions'>Login</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group1'>
                    <input
                        className='form-username'
                        type='text'
                        placeholder='username'
                        name='username'
                        value={username}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-password'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='1'
                        required
                    />
                </div>
                
                <button className='login-button' type='submit'> <p className='button-word'> login</p></button>
            </form>
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
                 <Link className='forgot-password' to='/reset-password'>Forgot Password?</Link>
            </div>
            
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);