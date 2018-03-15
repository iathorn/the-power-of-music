import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as baseActions from 'store/modules/base';
import LoginModal from '../../components/modal/LoginModal/LoginModal';

class LoginModalContainer extends Component {
    handleLogin = async () => {
        const { BaseActions, password } = this.props;
        
        try {
            await BaseActions.adminLogin(password);
            BaseActions.hideModal('login');
            localStorage.logged = 'true';
        } catch(e){
            console.log(e);
        }
    }

    handleCancel = () => {
        const {BaseActions} = this.props;
        BaseActions.hideModal('login');
    }

    handleChange = (e) => {
        const { BaseActions } = this.props;
        const { value } = e.target;
        BaseActions.changePasswordInput(value);
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleLogin();
        }
    }
    render() {
        const { handleChange, handleCancel, handleKeyPress, handleLogin } = this;
        const {visible, error, password} = this.props;
        return (
            <LoginModal
                onLogin={handleLogin}
                onCancel={handleCancel}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                visible={visible}
                error={error}
                password={password}
                />
        );
    }
}

export default connect((state) => ({
    visible: state
        .base
        .getIn(['modal', 'login']),
    password: state.base.getIn(['loginModal', 'password']),
    error: state.base.getIn(['loginModal', 'error'])
}), (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(LoginModalContainer);