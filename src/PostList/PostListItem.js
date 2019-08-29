import React from 'react';

import {Link} from "react-router-dom";

const PostListItem = ({post}) => {
    return (
        <Link to={'/postView/'+post.id} className='Black-Anchor'>
            <div className='Post-List-Item'>
                <span>{post.id}</span><span>{post.title}</span>
                <span>{post.writer} </span><span>{('' + post.created).slice(0, 10)}</span>
                <span>{post.recommend} </span><span>{post.views}</span>
            </div>
        </Link>
    );
};

export default PostListItem;