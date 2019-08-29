import React from 'react';

import {Link} from "react-router-dom";

import './index.css'

const BoardBox = ({board}) => {
    return (
        <div className='Board-Box White-Surface'>
            <Link to={'/board/' + board.id} className='Black-Anchor'>
                <div className='Edge-Triangle'/>
                <div className='Board-Name'>{board.board_name}</div>
                <div className='Board-Desc'>{board.board_desc}</div>
            </Link>
        </div>
    );
};

export default BoardBox;