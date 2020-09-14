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
        if (window.localStorage) {
            const cachedPoems = JSON.parse(window.localStorage.getItem('poems'));
            let poems;
            if (!cachedPoems || poemsNotUpdated()) {
                const res = await axios.get(`https://poemasmaker.firebaseio.com/poems.json`);
                poems = res.data;
                window.localStorage.setItem('poems', JSON.stringify(poems));
                window.localStorage.setItem('poemsLastUpdated', Date.now());
            } else {
                poems = cachedPoems;
            }
            const list = [];        
            for (const key in poems) {
                if (poems.hasOwnProperty(key)) {
                    const element = poems[key];
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
        }
    } catch (e) {
        console.error(e);
    }
}

function poemsNotUpdated() {
    if (window.localStorage) {
        const poemsLastUpdated = window.localStorage.getItem('poemsLastUpdated');
        const now = Date.now();
        const diffInHours = (now - poemsLastUpdated)/1000/60/60;
        return diffInHours > 1;
    }
    return true
}
