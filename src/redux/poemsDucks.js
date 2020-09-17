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

// Action creators
export function listPoems(list) {
    return {
        type: GET_POEMS_SUCCESS,
        payload: {
            list: list
        }
    };
}

// actions
export const getPoemsAction = () => async (dispatch, getState) => {
    try {
        let poems = getCachedPoems();
        if (poems.length === 0) {
            const res = await axios.get(`https://poemasmaker.firebaseio.com/poems.json`);
            poems = res.data;
            window.localStorage.setItem('poems', JSON.stringify(poems));
            window.localStorage.setItem('poemsLastUpdated', Date.now());
        }
        const list = buildPoemsList(poems);
        dispatch(listPoems(list));
    } catch (e) {
        console.error(e);
    }
}

export const searchPoem = (filter) => async (dispatch, getState) => {
    try {
        let poems;
        const res = await axios.get(`https://poemasmaker.firebaseio.com/poems.json?orderBy="indexes"&startAt="${filter}"&endAt="${filter}\uf8ff"`);
        poems = res.data;
        const list = [];
        for (const key in poems) {
            if (poems.hasOwnProperty(key)) {
                const element = poems[key];
                element['id'] = key;
                const pos = Math.floor(Math.random() * element.paragraphs.length-1) + 1;
                element['randomParagraph'] = element.paragraphs[pos].text;
                element['fullText'] = element.paragraphs.map((elem) => {
                        return elem.text;
                    }).join("<br><br>");
                list.push(element);
            }
        }
        dispatch(listPoems(list));
    } catch (e) {
        console.error(e);
    }
}

export const getCachedPoems = () => {
    if (window.localStorage) {
        const poemsLastUpdated = window.localStorage.getItem('poemsLastUpdated');
        const now = Date.now();
        const diffInHours = (now - poemsLastUpdated)/1000/60/60;
        if (diffInHours > 1) {
            return []; // Should retrieve again from server
        } else {
            return buildPoemsList(JSON.parse(window.localStorage.getItem('poems')));
        }
    }
    return []
}


// Helper function
function buildPoemsList(poems) {
    const list = [];
    for (const key in poems) {
        if (poems.hasOwnProperty(key)) {
            const element = poems[key];
            element['id'] = key;
            const pos = Math.floor(Math.random() * element.paragraphs.length-1) + 1;
            element['randomParagraph'] = element.paragraphs[pos].text;
            element['fullText'] = element.paragraphs.map((elem) => {
                    return elem.text;
                }).join("<br><br>");
            list.push(element);
        }
    }

    return list;
}