import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect, Link} from 'react-router-dom';

import './index.css'

@inject('stores')
@observer
class PostView extends Component {

    state = {
        id: 0,
        title: '',
        content: '',
        writer: '',
        views: 0,
        created: '',
        recommend: '',
        goToMain: false,
        goToEdit: false
    }

    async componentDidMount() {
        let {PostStore} = this.props.stores;
        let {id} = this.props.match.params;
        let post = await PostStore.getPostById(id);
        if (post)
            this.setState({
                ...post
            })
    }

    onRecommend = async (e) => {
        let {PostStore} = this.props.stores;
        await PostStore.recommendPost(this.props.match.params.id)
        this.setState({
            recommend: this.state.recommend + 1
        })
    }

    onDeletePost = async (e) => {
        let {PostStore} = this.props.stores;
        await PostStore.deletePost(this.props.match.params.id)
        this.setState({
            goToMain: true
        })
    }

    onEditClick = ()=>{
        this.setState({
            goToEdit: true
        })
    }

    render() {
        if (this.state.goToMain)
            return <Redirect to='/'/>
        if (this.state.goToEdit)
            return <Redirect to={'/post/edit/'+this.state.id}/>
        let {loginUserId} = this.props.stores.UserStore;
        return (
            <div className='White-Surface Box-Shadow Post-View-Container'>
                <div className='Post-Title'>
                    {this.state.title}
                </div>
                <div className='Post-Info-Container'>
                    <div className='Post-Info-Writer'>작성자 <Link to={'/user/' + this.state.writer}
                                                                className='Black-Anchor'>{this.state.writer}</Link>
                    </div>
                    <div className='Post-Info-Time'>{('' + this.state.created).slice(0, 10)}</div>
                    <div className='Post-Info-View'>조회수 {this.state.views}</div>
                </div>
                <div className='Post-Content'
                     dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                <div className='Post-Info-Container'>
                    <button className='Button1' onClick={this.onRecommend}>추천 {this.state.recommend}</button>
                    {this.state.writer == loginUserId ? <div className='Right-Navi'>
                        <button className='Button1' onClick={this.onDeletePost}>삭제</button>
                        <button className='Button1' onClick={this.onEditClick}>수정</button>
                    </div> : <div></div>}
                </div>
            </div>
        );
    }
}

export default PostView;