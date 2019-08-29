import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom'
import queryString from 'query-string';

import './index.css'

@inject('stores')
@observer
class PostWrite extends Component {

    state = {
        title: '',
        content: '',
        board: 1,
        goToMain: false
    }

    componentDidMount() {
        this.props.stores.BoardStore.getBoards()
        let board = queryString.parse(this.props.location.search).board || 1;
        this.setState({board: board});
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

    onBoardChanged = (e) => {
        this.setState({board: e.target.value});
    }

    onCancelClick = (e) => {
        if (window.confirm('작성 중이던 내용이 사라집니다. 취소하시겠습니까?'))
            this.setState({
                goToMain: true
            })
    }

    onSubmitClick = (e) => {
        this.props.stores.PostStore.writePost({...this.state, writer: this.props.stores.UserStore.loginUserId})
        this.setState({
            goToMain: true
        })
    }

    render() {
        if (this.state.goToMain)
            return <Redirect to='/'/>;
        if (!this.props.stores.UserStore.loginUserId) {
            alert('로그인이 필요한 기능입니다');
            return <Redirect to='/login'/>;
        }
        return (
            <div>
                <div className='White-Surface Box-Shadow Editor-Form'>
                    <input className='Input-Title' placeholder='제목' value={this.state.title}
                           onChange={this.onTitleChanged}/>
                    게시판 <select onChange={this.onBoardChanged} value={this.state.board}>
                    {this.props.stores.BoardStore.boards && this.props.stores.BoardStore.boards.map(e =>
                        <option value={e.id} key={e.id}>{e.board_name}</option>
                    )}
                </select>
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

export default PostWrite;