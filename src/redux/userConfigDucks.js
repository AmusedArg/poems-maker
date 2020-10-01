import axios from "axios";

// Constants
const dataInicial = {
  data: null
}

// Types
const UPDATE_USER_CONFIG = 'UPDATE_USER_CONFIG';

// Reducer
export default function userConfigReducer(state = dataInicial, action) {
  switch (action.type) {
    case UPDATE_USER_CONFIG:
      return { ...state, data: action.payload.config }
    default:
      return state;
  }
}

// Action Creators
export function updateUserConfig(config) {
  return {
    type: UPDATE_USER_CONFIG,
    payload: {
      config: config
    }
  };
}

// Methods
export const getUserConfigAction = (user) => async (dispatch, getState) => {
  try {
    if (user) {
      const token = await user.getIdToken(true);
      const res = await axios.get(`https://poemasmaker.firebaseio.com/users/${user.uid}.json?auth=${token}`);
      dispatch(updateUserConfig(res.data));
    }
  } catch (e) {
    console.error(e);
  }
}

export const userConfigAddFavPoemAction = (poemId, data) => async (dispatch, getState) => {
  try {
    const userConfig = getState().userConfig?.data;
    userConfig['favorites']['poems'][poemId] = data;
    dispatch(updateUserConfig({...userConfig}));
  } catch (e) {
    console.error(e);
  }
}

export const userConfigDeleteFavPoemAction = (poemId) => async (dispatch, getState) => {
  try {
    const userConfig = getState().userConfig?.data;
    for (const key in userConfig.favorites.poems) {
      if (userConfig.favorites.poems.hasOwnProperty(key)) {
        if (key === poemId) {
          delete userConfig.favorites.poems[key];
          break;
        }
      }
    }
    dispatch(updateUserConfig({...userConfig}));
  } catch (e) {
    console.error(e);
  }
}

export const userConfigUpdatePhotoAction = (photoURL) => async (dispatch, getState) => {
  try {
    const userConfig = getState().userConfig?.data;
    userConfig.photoURL = photoURL;
    dispatch(updateUserConfig({...userConfig}));
  } catch (e) {
    console.error(e);
  }
}
