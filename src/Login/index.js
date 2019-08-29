import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

import './index.css'

@inject('stores')
@observer
class Index extends Component {

    state = {
        id: '',
        password: '',
        goToMain: false
    }

    onLoginClick = async (e) => {
        let {UserStore} = this.props.stores;
        let response = await UserStore.login(this.state);
        alert(response.message)
        this.setState({
            goToMain: response.success
        })
    }

    onInputChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        if(this.state.goToMain)
            return <Redirect to='/'/>
        return (
            <div>
                <div className='White-Surface Login-Form'>
                    <h1>게시 게시판</h1>
                    <input placeholder='아이디' onChange={this.onInputChanged} name='id' value={this.state.id}/>
                    <input placeholder='비밀번호' type='password' onChange={this.onInputChanged} name='password'
                           value={this.state.password}/>
                    <button className='Primary-Color' onClick={this.onLoginClick}>로그인</button>
                </div>
            </div>
        );
    }
}

export default Index;