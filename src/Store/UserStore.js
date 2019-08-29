import {observable, action} from "mobx"
import axios from "axios"

class UserStore {
    static _instance = null;

    static getInstance() {
        if (UserStore._instance === null)
            UserStore._instance = new UserStore();
        return UserStore._instance;
    }

    constructor() {
        UserStore._instance = this;
    }

    @observable loginUserId;
    @action login = async ({id, password}) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/user/login',
                method: 'post',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                }, data: {
                    id: id,
                    password: password
                },
                timeout: 3000
            });
            if (response.data.success) {
                this.loginUserId = response.data.id;
            }
            if (response)
                return response.data
        } catch (e) {
            alert(e.toLocaleString())
        }
    }

    @action confirmId = async (id) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/user/confirmId/' + id,
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            return response.data;
        } catch (e) {
            alert(e.toLocaleString())
        }
        return false;
    }

    @action register = async (user) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/user/register/',
                method: 'post',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                }, data: user,
                timeout: 3000
            });
        } catch (e) {
            alert(e.toLocaleString())
        }
    }

    @action getUserInfo = async (id) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/user/getInfo/' + id,
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response) return response.data;
        } catch (e) {
            alert(e.toLocaleString())
        }
    }
    @action updateUser = async (user) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/user/update',
                method: 'put',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },data:user,
                timeout: 3000
            });
            return response.data;
        } catch (e) {
            alert(e.toLocaleString())
        }
    }

    @action logout = () => {
        this.loginUserId = undefined
    }
}

export default UserStore.getInstance();