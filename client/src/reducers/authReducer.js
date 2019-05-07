import { SET_CURRENT_USER, SET_LOGIN_PAGE } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  isLoginScreen: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_LOGIN_PAGE:
      return {
        ...state,
        isLoginScreen: action.payload
      };
    default:
      return state;
  }
}
