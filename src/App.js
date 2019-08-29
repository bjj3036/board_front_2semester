import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import {Provider} from 'mobx-react';
import {observer} from "mobx-react";
import stores from './Store'

import Main from './Main';
import Login from './Login';
import Error from './Error';
import Board from './Board';
import PostWrite from './PostWrite';
import PostView from './PostView';
import Header from './Header';
import Register from './Register';
import Logout from './Logout';
import UserInfo from './UserInfo';
import InfoEdit from './InfoEdit';
import PostEdit from './PostEdit';

function App() {
    return (
        <Provider stores={stores}>
            <BrowserRouter>
                <div className="App Surface-Color">
                    <Header/>
                    <section className='Main-Container'>
                        <Switch>
                            <Route path='/' exact component={Main}/>
                            <Route path='/login' exact component={Login}/>
                            <Route path='/board/:id' exact component={Board}/>
                            <Route path='/postView/:id' exact component={PostView}/>
                            <Route path='/post/write' exact component={PostWrite}/>
                            <Route path='/register' exact component={Register}/>
                            <Route path='/logout' exact component={Logout}/>
                            <Route path='/user/:id' exact component={UserInfo}/>
                            <Route path='/infoEdit' exact component={InfoEdit}/>
                            <Route path='/post/edit/:id' exact component={PostEdit}/>
                            <Route component={Error}></Route>
                        </Switch>
                    </section>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
