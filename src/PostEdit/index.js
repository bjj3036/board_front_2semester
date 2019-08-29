import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom'
import queryString from 'query-string';

import './index.css'

@inject('stores')
@observer
class PostEdit extends Component {

    state = {
        id: 0,
        title: '',
        content: '',
        writer: '',
        goToMain: false
    }

    async componentDidMount() {
        let post, id = this.props.match && this.props.match.params.id;
        if (id) post = await this.props.stores.PostStore.getPostById(id);
        delete post.created;
        this.setState({...post});
    }

    onTitleChanged = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onContentChanged = (e, editor) => {
        this.setState({
            ...this.state,
            content: editor.getData()
        });
    }

    onCancelClick = (e) => {
        if (window.confirm('작성 중이던 내용이 사라집니다. 취소하시겠습니까?'))
            this.setState({
                goToMain: true
            })
    }

    onSubmitClick = async (e) => {
        await this.props.stores.PostStore.updatePost(this.state)
        this.setState({
            goToMain: true
        })
    }

    render() {
        if (this.state.goToMain)
            return <Redirect to={'/postView/'+this.state.id}/>;
        if (!this.props.stores.UserStore.loginUserId) {
            alert('로그인이 필요한 기능입니다');
            return <Redirect to='/login'/>;
        }
        if (this.state.writer && this.state.writer !== this.props.stores.UserStore.loginUserId) {
            alert('접근이 불가합니다');
            return <Redirect to={'/postView/'+this.state.id}/>;
        }
        return (
            <div>
                <div className='White-Surface Box-Shadow Editor-Form'>
                    <input className='Input-Title' placeholder='제목' value={this.state.title}
                           onChange={this.onTitleChanged}/>
                    <CKEditor editor={ClassicEditor}
                              data={this.state.content}
                              onChange={this.onContentChanged}/>
                </div>
                <div className='Button-Container'>
                    <button className='Button1' onClick={this.onCancelClick}>취소</button>
                    <button className='Button1' onClick={this.onSubmitClick}>확인</button>
                </div>
            </div>
        );
    }
}

export default PostEdit;