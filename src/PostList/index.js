import React from 'react';

import PostListItem from './PostListItem'

import './index.css'

const PostList = ({posts}) => {
    return (
        <div className='White-Surface Box-Shadow List-Item-Box'>
            <div className='Post-List-Item'>
                <span>번호</span><span>제목</span>
                <span>글쓴이</span><span>작성일</span>
                <span>추천</span><span>조회</span></div>
            {posts && posts.map(e => <PostListItem key={e.id} post={e}/>)}
        </div>
    );
};

export default PostList;