import axios from "axios";

// Constants
const dataInicial = {
  list: []
}

// Types
const GET_AUTHORS_SUCCESS = 'GET_AUTHORS_SUCCESS';

// Reducer
export default function authorsReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_AUTHORS_SUCCESS:
      return { ...state, list: action.payload.authors }
    default:
      return state;
  }
}

// Action Creators
export function getAuthors(authors) {
  return {
    type: GET_AUTHORS_SUCCESS,
    payload: {
      authors: authors
    }
  };
}

// Methods
export const getAuthorsAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`https://poemasmaker.firebaseio.com/authors.json`);
    // TODO: Better to return an array of objects
    dispatch(getAuthors(Object.entries(res.data)));
  } catch (e) {
    console.error(e);
  }
}
