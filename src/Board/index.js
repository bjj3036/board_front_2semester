import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect, Link} from 'react-router-dom';
import './index.css';

import queryString from 'query-string';

import PostList from '../PostList'

@inject('stores')
@observer
class Board extends Component {

    state = {
        write_post: false,
        redirect: false,
        page: 1,
        order: 'time',
        board: 1,
        first: 1,
        last: 10,
        pages: []
    }

    async componentDidMount() {
        const props = this.props;
        let id = props.match.params.id;
        await this.fetchBoard(id)
        this.setState({board: id, ...queryString.parse(props.location.search)})
        await props.stores.PostStore.loadPosts(this.state)
        this.setFirstLast(this.state.page)
    }

    fetchBoard = async (id) => {
        await this.props.stores.BoardStore.getBoard(id);
    }

    onWritePostClick = (e) => {
        this.setState({
            write_post: true
        })
    }

    onSelectChanged = (e) => {
        let selectOrder = e.target.value;
        this.setState({
            order: selectOrder
        })
        let option = {...this.state}
        option['order'] = selectOrder
        const props = this.props;
        props.stores.PostStore.loadPosts(option)
    }

    setFirstLast = (page) => {
        let max_page = this.props.stores.BoardStore.board.max_page;
        let pivot = page - ((page - 1) % 10);
        let first = pivot, last = pivot + 9;
        let arr = [];
        last = last > max_page ? max_page : last;
        for (let i = first; i <= last; i++) {
            arr.push(i)
        }
        this.setState({
            first,
            last,
            pages: arr
        })
    }

    onPageChange = async (e) => {
        let selectPage = Number.parseInt(e.target.innerHTML)
        this.setState({page: selectPage})
        let option = {...this.state}
        option['page'] = selectPage
        const props = this.props;
        await props.stores.PostStore.loadPosts(option)
    }

    onNextClick = async (e) => {
        let page = this.state.last + 1;
        this.setFirstLast(page)
        let option = {...this.state}
        option['page'] = page
        const props = this.props;
        await props.stores.PostStore.loadPosts(option)
        this.setState({
            page
        })
    }

    onPreviousClick = async (e) => {
        let page = this.state.first - 1;
        console.log('앞으로' + page)
        this.setFirstLast(page)
        let option = {...this.state}
        option['page'] = page
        const props = this.props;
        await props.stores.PostStore.loadPosts(option)
        this.setState({
            page
        })
    }

    render() {
        if (this.state.write_post)
            return (<Redirect to={`/post/write?board=${this.props.match.params.id}`}/>)
        let {board} = this.props.stores.BoardStore;
        return (
            <div>
                <p>{board && board.board_name}</p>
                <p className='Board-Desc'>{board && board.board_desc}</p>
                <select onChange={this.onSelectChanged} value={this.state.order}>
                    <option value="time">최신순</option>
                    <option value="view">조회순</option>
                    <option value="recommend">추천순</option>
                </select>
                <PostList posts={this.props.stores.PostStore.posts}/>
                {this.state.first !== 1 &&
                <span onClick={this.onPreviousClick} dangerouslySetInnerHTML={{__html: '&lt'}}></span>}
                {this.state.pages.map(e => {
                    if (this.state.page == e)
                        return <span key={e} className='Page-Button Select-Page'
                                     onClick={this.onPageChange}>{e}</span>
                    return <span key={e} className='Page-Button'
                                 onClick={this.onPageChange}>{e}</span>
                })}
                {this.state.last !== (this.props.stores.BoardStore.board && this.props.stores.BoardStore.board.max_page) &&
                <span onClick={this.onNextClick} dangerouslySetInnerHTML={{__html: '&gt'}}></span>}
                <button className='Button1 NewPost-Button' onClick={this.onWritePostClick}>새 글쓰기</button>
            </div>
        );
    }
}

export default Board;