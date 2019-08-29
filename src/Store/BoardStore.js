import {observable, action} from "mobx"
import axios from "axios"

class BoardStore {
    static _instance = null;

    static getInstance() {
        if (BoardStore._instance === null)
            BoardStore._instance = new BoardStore();
        return BoardStore._instance;
    }

    constructor() {
        BoardStore._instance = this;
    }

    @observable board;
    @action getBoard = async (id) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/board/find/'+id,
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.data) {
                this.board = response.data
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
    }
    @observable boards;
    @action getBoards = async () => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/board/findAll',
                method: 'get',
                header: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if (response.data) {
                this.boards = response.data
            }
        } catch (e) {
            alert(e.toLocaleString())
        }
    }
}


export default BoardStore.getInstance();