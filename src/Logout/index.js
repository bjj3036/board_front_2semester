import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import {Redirect} from 'react-router-dom'

@inject('stores')
@observer
class Logout extends Component {
    state = {
        go_to_main: false
    }

    async componentDidMount() {
        await this.props.stores.UserStore.logout()
        this.setState({
            go_to_main: true
        })
    }

    render() {
        if (this.state.go_to_main)
            return <Redirect to='/'/>
        return (
            <div>
                로그아웃 중..
            </div>
        );
    }
}

export default Logout;