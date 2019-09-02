import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

import './index.css'

@inject('stores')
@observer
class Register extends Component {

    state = {
        username: '',
        id: '',
        password: '',
        password_confirm: '',
        gender: '',
        age: 0,
        profileImage: 1,
        can_use_id: false,
        correct_password: true,
        go_to_login: false,
    }

    onInputChanged = (e) => {
        if (e.target.name === 'password_confirm' || e.target.name === 'password') {
            this.setState({
                correct_password: this.state.password === e.target.value
            })
        }
        if (e.target.name === 'id') {
            this.setState({
                can_use_id: false,
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onFileSelected = async (e) => {
        if (e.target.files.length) {
            let file = e.target.files[0]
            let profile_image = await this.props.stores.AttachStore.upload(file);
            console.log(profile_image)
            this.setState({
                profileImage: profile_image
            })
        }
    }

    onRegister = async () => {
        if (!this.state.can_use_id) {
            alert('아이디 중복확인이 필요합니다');
            return;
        }
        if (!this.state.correct_password) {
            alert('비밀번호가 일치하지 않습니다');
            return;
        }
        let confirm_keys = ['id', 'password', 'username', 'age', 'gender']
        for (let key of confirm_keys) {
            if (!this.state[key]) {
                alert('입력하지 않은 정보가 존재합니다 / ' + key)
                return;
            }
        }
        await this.props.stores.UserStore.register(this.state);
        this.setState({
            go_to_login: true
        })
    }

    confirmId = async () => {
        if (!this.state.id) {
            alert('아이디를 입력해주세요!')
            return;
        }
        let can_use_id = await this.props.stores.UserStore.confirmId(this.state.id)
        if (can_use_id) {
            alert('사용 가능한 ID입니다')
        } else {
            alert('이미 존재하는 ID입니다')
        }
        this.setState({
            can_use_id
        })
    }

    render() {
        if (this.state.go_to_login)
            return <Redirect to='/login'/>;
        return (
            <div className='White-Surface Box-Shadow' style={{padding: '20px', marginTop: '10%'}}>
                <div className='Register-Container'>
                    <div className='Register-Form'>
                        <h3>회원가입</h3>
                        <input type='text' placeholder='이름' name='username' onChange={this.onInputChanged}/>
                        <input type='text' placeholder='아이디' name='id' onChange={this.onInputChanged}/>
                        <button className='Button1' onClick={this.confirmId}>중복 확인</button>
                        <input type='password' placeholder='비밀번호' name='password' onChange={this.onInputChanged}/>
                        <input type='password' placeholder='비밀번호 확인' name='password_confirm'
                               onChange={this.onInputChanged}/>
                        {!this.state.correct_password && <div className='Warning'>비밀번호가 일치하지 않습니다</div>}
                        <div>
                            <label><input type='radio' value='남자' name='gender'
                                          onClick={this.onInputChanged}/>남자</label>
                            <label><input type='radio' value='여자' name='gender'
                                          onClick={this.onInputChanged}/>여자</label>
                        </div>
                        <input type='number' pattern='^\d*(\.\d{0,2})?$' placeholder='나이' name='age'
                               onChange={this.onInputChanged}/>
                    </div>
                    <div className='Image-Container'>
                        <img className='Profile-Image Surface-Color Box-Shadow'
                             src={'http://localhost:8080/image/' + this.state.profileImage}/>
                        <input type='file' accept="image/jpeg, image/png" onChange={this.onFileSelected}
                               title='이미지 선택'/>
                    </div>
                </div>
                <button className='Button1' onClick={this.onRegister}>회원가입</button>
            </div>
        );
    }
}

export default Register;