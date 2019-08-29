import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject('stores')
@observer
class Header extends Component {
    render() {
        let {stores} = this.props
        return (
            <header className="App-header Primary-Color">
                <Link to='/' className='White-Anchor'><h2>게시 게시판</h2></Link>
                {stores.UserStore.loginUserId ?
                    <div>
                        <Link to='/logout' className='White-Anchor'>로그아웃</Link>
                        /
                        <Link to='/infoEdit' className='White-Anchor'>정보확인</Link>
                    </div> :
                    <div>
                        <Link to='/register' className='White-Anchor'>회원가입</Link>
                        /
                        <Link to='/login' className='White-Anchor'>로그인</Link>
                    </div>}
            </header>
        );
    }
}

export default Header;