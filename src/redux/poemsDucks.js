import axios from "axios";

// constants
const dataInicial = {
    list: []
}

// types
const GET_POEMS_SUCCESS = 'GET_POEMS_SUCCESS';

// reducer
export default function poemsReducer(state = dataInicial, action) {
    switch (action.type) {
        case GET_POEMS_SUCCESS:
            return {...state, list: action.payload.list}
        default:
            return state;
    }
}

// actions
export const getPoemsAction = () => async (dispatch, getState) => {

    try {
        const list = [];
        const res = await axios.get(`https://poemasmaker.firebaseio.com/poems.json`);
        for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
                const element = res.data[key];
                element['id'] = key;
                list.push(element);
            }
        }
        dispatch({
            type: GET_POEMS_SUCCESS,
            payload: {
                list: list
            }
        });
    } catch (e) {
        console.error(e);
    }
}
