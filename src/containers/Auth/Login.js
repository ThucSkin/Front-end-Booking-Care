import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { FaFacebook, FaGoogle } from "react-icons/fa"

import * as actions from "../../store/actions";

import './Login.scss';
import { handleLoginApi } from '../../services/userService';
//import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnChangeInputUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    handleOnChangeInputPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    handleLogin = async (e) => {
        //e.preventDefault()
        this.setState({ errMessage: '' });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response.data) {
                this.setState({
                    password: '',
                    errMessage: error.response.data.message
                });
            }
        }
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {
        return (
            <>
                <section>
                    <div className="form-box">
                        <div className="form-value">
                            <form>
                                <h2>Login</h2>
                                <div className="inputbox">
                                    <input onChange={(e) => this.handleOnChangeInputUsername(e)}
                                        value={this.state.username} />
                                    <label>Email</label>
                                </div>
                                <div className="inputbox">
                                    <input onChange={(e) => this.handleOnChangeInputPassword(e)}
                                        onKeyDown={(e) => this.handleKeyDown(e)} type="password" />
                                    <label>Password</label>
                                </div>
                                <div className="forget">
                                    <label><input type="checkbox" name="remember-me" />Remember Me?
                                        <a href='/'>Forget Password</a></label>
                                </div>
                                <div className="message"></div>
                                <button onClick={(e) => this.handleLogin(e)} type='button'>Log in</button>
                                <div className="col-12" style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>
                                <div className="register">
                                    <p>Don't have a account <a href="/">Register</a></p>
                                </div>
                                <div className="card-bottom">
                                    <a className="btn-google btn-sm fw-bold text-uppercase"
                                        href="/oauth2/authorization/Google">
                                        <FaGoogle /> Login with Google
                                    </a>
                                    <a className="btn-sm btn-facebook  fw-bold text-uppercase"
                                        href="/oauth2/authorization/Facebook">
                                        <FaFacebook />Login with Facebook
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
