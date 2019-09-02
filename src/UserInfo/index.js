import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

import './index.css'

@inject('stores')
@observer
class UserInfo extends Component {

    state = {
        username: '이름',
        id: 'exampleId',
        gender: '남자',
        age: 23,
        profile_image: 1,
        total_recommend: 0,
        total_post: 0
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let userInfo = await this.props.stores.UserStore.getUserInfo(id);
        this.setState({...userInfo})
    }

    render() {
        if (this.state.go_to_login)
            return <Redirect to='/login'/>;
        return (
            <div className='White-Surface Box-Shadow' style={{padding: '20px', marginTop: '20%'}}>
                <div className='Register-Container'>
                    <div className='Register-Form'>
                        <h3>유저 정보</h3>
                        <div>
                            아이디 {this.state.id}
                        </div>
                        <div>
                            이름 {this.state.username}
                        </div>
                        <div>
                            성별 {this.state.gender}
                        </div>
                        <div>
                            나이 {this.state.age}
                        </div>
                        <div>
                            총 게시글 수 {this.state.total_post}
                        </div>
                        <div>
                            총 추천수 {this.state.total_recommend}
                        </div>
                    </div>
                    <div className='Image-Container'>
                        <img className='Profile-Image Surface-Color Box-Shadow'
                             src={'http://localhost:8080/image/' + this.state.profile_image}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;