import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from "mobx-react";

@inject('stores')
@observer
class InfoEdit extends Component {
    state = {
        username: '이름',
        id: 'exampleId',
        gender: '남자',
        age: 23,
        password: 0,
        password_confirm: 0,
        profile_image: 1,
        total_recommend: 0,
        total_post: 0,
        goToMain: false
    }

    onInputChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onFileSelected = async (e) => {
        if (e.target.files.length) {
            let file = e.target.files[0]
            let profile_image = await this.props.stores.AttachStore.upload(file);
            this.setState({
                profile_image
            })
        }
    }

    onUpdateClick = async (e)=>{
        if(!this.state.password_confirm){
            alert('현재 비밀번호를 입력해주세요')
            return;
        }
        let {UserStore} = this.props.stores;
        let response = await UserStore.login({
            id: this.state.id,
            password: this.state.password_confirm
        })
        console.log(response)
        if(response.success){
            await UserStore.updateUser(this.state)
            alert('정보가 수정되었습니다')
            this.setState({
                goToMain: true
            })
        }else{
            alert(response.message)
        }
    }


    async componentDidMount() {
        let id = this.props.stores.UserStore.loginUserId;
        let userInfo = await this.props.stores.UserStore.getUserInfo(id);
        this.setState({...userInfo})
    }

    render() {
        if(this.state.goToMain)
            return <Redirect to='/'/>
        if (!this.props.stores.UserStore.loginUserId) {
            alert('로그인이 필요한 기능입니다');
            return <Redirect to='/login'/>;
        }
        return (
            <div className='White-Surface Box-Shadow' style={{padding: '20px', marginTop: '10%'}}>
                <div className='Register-Container'>
                    <div className='Register-Form'>
                        <h3>정보수정</h3>
                        아이디 {this.state.id}
                        <input type='text' placeholder='이름' name='username'value={this.state.username} onChange={this.onInputChanged}/>
                        <input type='password' placeholder='변경할 비밀번호' name='password' onChange={this.onInputChanged}/>
                        <input type='password' placeholder='현재 비밀번호' name='password_confirm'
                               onChange={this.onInputChanged}/>
                        성별 {this.state.gender}
                        <div>
                            <label><input type='radio' value='남자' name='gender'
                                          onClick={this.onInputChanged}/>남자</label>
                            <label><input type='radio' value='여자' name='gender'
                                          onClick={this.onInputChanged}/>여자</label>
                        </div>
                        나이 <input type='number' pattern='^\d*(\.\d{0,2})?$' placeholder='나이' name='age'
                               value={this.state.age} onChange={this.onInputChanged}/>
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
                        <input type='file' accept="image/jpeg, image/png" onChange={this.onFileSelected}
                               title='이미지 선택'/>
                    </div>
                </div>
                <button className='Button1' onClick={this.onUpdateClick}>정보수정</button>
            </div>
        );
    }
}

export default InfoEdit;