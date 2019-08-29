import {observable, action} from "mobx"
import axios from "axios"

class PostStore {
    static _instance = null;

    static getInstance() {
        if (PostStore._instance === null)
            PostStore._instance = new PostStore();
        return PostStore._instance;
    }

    constructor() {
        PostStore._instance = this;
    }

    @observable posts;
    @action loadPosts = async (option) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/post/load?board=${option.board}&page=${option.page}&order=${option.order}`,
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.data) {
                this.posts = response.data
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
    }

    @action loadRecent = async () => {
        try {
            let response = await axios({
                url: `http://localhost:8080/post/loadRecent`,
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.data) {
                this.posts = response.data
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
    }

    @observable post
    @action getPostById = async (id) => {
        try {
            let response = await axios({
                url: `http://localhost:8080/post/get/`+id,
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.data) {
                this.post = response.data
                return this.post
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
    }

    @action writePost = async (post) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/post/write',
                method: 'post',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                }, data: post,
                timeout: 3000
            });
            if (response.data) {
                return true;
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
        return false;
    }

    @action updatePost = async (post)=>{
        console.log(post)
        try {
            let response = await axios({
                url: 'http://localhost:8080/post/update',
                method: 'put',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },data:post,
                timeout: 3000
            });
            if (response.data) {
                return true;
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
        return false;
    }

    @action recommendPost = async (id) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/post/recommend/'+id,
                method: 'put',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.data) {
                return true;
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
        return false;
    }

    @action deletePost = async (id) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/post/delete/'+id,
                method: 'delete',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.data) {
                return true;
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
        return false;
    }


}


export default PostStore.getInstance();