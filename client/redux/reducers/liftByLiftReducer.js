import actionTypes from '../actionTypes';

export const liftByLift = (state = { total: 12, completed: 0 }, action) => {
  switch (action.type) {
    case actionTypes.LIFT_BY_LIFT:
      return {
        ...state,
        completed: action.payload
      };
    default:
      return state;
  }
};
