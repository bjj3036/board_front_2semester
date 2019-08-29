import {observable, action} from "mobx"
import axios from "axios"

class AttachStore {
    static _instance = null;

    static getInstance() {
        if (AttachStore._instance === null)
            AttachStore._instance = new AttachStore();
        return AttachStore._instance;
    }

    constructor() {
        AttachStore._instance = this;
    }

    @action upload = async (file) => {
        let formData = new FormData();
        formData.append('srcFile', file);
        try {
            let response = await axios({
                url: 'http://localhost:8080/image/upload',
                method: 'post',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                }, data: formData,
                timeout: 3000
            });
            if (response.data) {
                return response.data
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
    }
}


export default AttachStore.getInstance();