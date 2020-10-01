import axios from "axios";

// Constants
const dataInicial = {
  data: null
}

// Types
const GET_USER_CONFIG = 'GET_USER_CONFIG';

// Reducer
export default function userConfigReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_USER_CONFIG:
      return { ...state, data: action.payload.config }
    default:
      return state;
  }
}

// Action Creators
export function getUserConfig(config) {
  return {
    type: GET_USER_CONFIG,
    payload: {
      config: config
    }
  };
}

// Methods
export const getUserConfigAction = (user) => async (dispatch, getState) => {
  try {
    const token = await user.getIdToken(true);
    const res = await axios.get(`https://poemasmaker.firebaseio.com/users/${user.uid}.json?auth=${token}`);
    dispatch(getUserConfig(res.data));
  } catch (e) {
    console.error(e);
  }
}

export const userConfigDeleteFavPoemAction = (poemId) => async (dispatch, getState) => {
  try {
    const userConfig = getState().userConfig?.data;
    for (const key in userConfig.favorites) {
      if (userConfig.favorites.hasOwnProperty(key)) {
        if (key === poemId) {
          delete userConfig.favorites[key];
          break;
        }
      }
    }
    dispatch(getUserConfig({...userConfig}));
  } catch (e) {
    console.error(e);
  }
}

export const userConfigUpdatePhotoAction = (photoURL) => async (dispatch, getState) => {
  try {
    const userConfig = getState().userConfig?.data;
    userConfig.photoURL = photoURL;
    dispatch(getUserConfig({...userConfig}));
  } catch (e) {
    console.error(e);
  }
}
