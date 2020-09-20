import axios from "axios";

// Constants
const dataInicial = {
  poem: '',
  poemOfTheDay: ''
}

// Types
const GET_POEM_SUCCESS = 'GET_POEM_SUCCESS';
const GET_RANDOM_POEM_SUCCESS = 'GET_RANDOM_POEM_SUCCESS';
const GET_POEM_DAY_SUCCESS = 'GET_POEM_DAY_SUCCESS';

// Reducer
export default function poemReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_RANDOM_POEM_SUCCESS:
      return { ...state, poem: action.payload.poem }
    case GET_POEM_SUCCESS:
      return { ...state, poem: action.payload.poem }
    case GET_POEM_DAY_SUCCESS:
      return { ...state, poemOfTheDay: action.payload.poemOfTheDay }
    default:
      return state;
  }
}

// Action Creators
export function createRandomPoem(poem) {
  return {
    type: GET_RANDOM_POEM_SUCCESS,
    payload: {
      poem: poem
    }
  };
}

export function createPoem(poem) {
  return {
    type: GET_POEM_SUCCESS,
    payload: {
      poem: poem
    }
  };
}

export function createPoemOfTheDay(poem) {
  return {
    type: GET_POEM_DAY_SUCCESS,
    payload: {
      poemOfTheDay: poem
    }
  };
}

// Methods
export const getPoemOfTheDayAction = () => async (dispatch, getState) => {

  try {
    const res = await axios.get(`https://poemasmaker.firebaseio.com/poemOfTheDay.json`);
    dispatch(createPoemOfTheDay(res.data));
  } catch (e) {
    console.error(e);
  }
}

export const getPoemAction = (id) => async (dispatch, getState) => {

  try {
    const res = await axios.get(`https://poemasmaker.firebaseio.com/poems/${id}.json`);
    const poem = {
      id: res.data.id,
      author: res.data.author,
      website: res.data.website,
      twitter: res.data.twitter,
      instagram: res.data.instagram,
      title: res.data.title,
      paragraphs: res.data.paragraphs,
      fullText: res.data.paragraphs.map(function (elem) {
        elem.text = elem.text.replace(/\n/g, "<br />");
        return elem.text;
      }).join("<br><br>")
    }
    dispatch(createPoem(poem));
  } catch (e) {
    console.error(e);
  }
}

export const getRandomPoemAction = () => async (dispatch, getState) => {

  try {
    const res = await axios.get(`https://us-central1-poemasmaker.cloudfunctions.net/random`);
    const poem = {
      id: res.data.id,
      author: res.data.author,
      website: res.data.website,
      twitter: res.data.twitter,
      instagram: res.data.instagram,
      title: res.data.title,
      paragraphs: res.data.paragraphs,
      fullText: res.data.paragraphs.map(function (elem) {
        elem.text = elem.text.replace(/\n/g, "<br />");
        return elem.text;
      }).join("<br><br>")
    }
    dispatch(createRandomPoem(poem));
  } catch (e) {
    console.error(e);
  }
}
