// Constants
const dataInicial = {
  data: null
}

// Types
const USER_AUTHORIZED = 'USER_AUTHORIZED';

// Reducer
export default function userAuthorizedReducer(state = dataInicial, action) {
  switch (action.type) {
    case USER_AUTHORIZED:
      return { ...state, data: action.payload.user }
    default:
      return state;
  }
}

// Action Creators
export function authorizeUser(user) {
  return {
    type: USER_AUTHORIZED,
    payload: {
      user: user
    }
  };
}

// Methods
export const authorizeUserAction = (user) => async (dispatch, getState) => {
  try {
    dispatch(authorizeUser(user));
  } catch (e) {
    console.error(e);
  }
}
