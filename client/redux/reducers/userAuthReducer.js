import actionTypes from '../actionTypes';

const initialState = {
  user: {
    userStatus: actionTypes.ANONYMOUS
  }
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        user: {
          userStatus: actionTypes.LOGGED_IN
        }
      };
    case actionTypes.LOGGED_OUT:
      return {
        ...state,
        user: {
          userStatus: actionTypes.ANONYMOUS
        }
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
