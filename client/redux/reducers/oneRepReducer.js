import actionTypes from '../actionTypes';

export const OneRep = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ONE_REP:
      return {
        ...state,
        Bench: action.Bench,
        Overhead: action.Overhead,
        Deadlift: action.Deadlift,
        Squat: action.Squat
      };
    case actionTypes.SET_MAX:
      return {
        ...state,
        calculatedMax: {
          bench: action.bench,
          overhead: action.overhead,
          deadlift: action.deadlift,
          squat: action.squat
        }
      };
    default:
      return state;
  }
};
