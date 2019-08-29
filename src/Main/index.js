import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import BoardBox from '../BoardBox';
import PostList from '../PostList';

import './index.css'

@inject('stores')
@observer
class Index extends Component {

    async componentDidMount() {
        await this.props.stores.BoardStore.getBoards();
        await this.props.stores.PostStore.loadRecent();
    }

    render() {
        return (
            <div>
                <p>최근 글</p>
                <PostList posts={this.props.stores.PostStore.posts}/>
                <p>게시판들</p>
                <div className='Board-Container White-Surface Box-Shadow'>
                    {this.props.stores.BoardStore.boards && this.props.stores.BoardStore.boards.map(e => <BoardBox
                        key={e.id} board={e}/>)}
                </div>
            </div>
        );
    }
}

export default Index;