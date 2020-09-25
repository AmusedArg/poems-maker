import axios from "axios";

// Constants
const dataInicial = {
  sections: [],
  version: null
}

// Types
const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';

// Reducer
export default function configReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_CONFIG_SUCCESS:
      return { ...state, sections: action.payload.config.sections, version: action.payload.config.version }
    default:
      return state;
  }
}

// Action Creators
export function config(config) {
  return {
    type: GET_CONFIG_SUCCESS,
    payload: {
      config: config
    }
  };
}

// Methods
export const configAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`https://poemasmaker.firebaseio.com/config.json`);
    let sections = [];
    Object.keys(res.data.sections).forEach(key => {
      sections.push({
        key: key, 
        info: res.data.sections[key] 
      });
    });
    sections.sort((a,b) => {
      return a.info.order - b.info.order;
    })
    res.data.sections = sections;
    dispatch(config(res.data));
  } catch (e) {
    console.error(e);
  }
}
