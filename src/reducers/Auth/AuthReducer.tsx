import {LoginActionType} from "./Actions/LoginAction";
import {LogoutActionType} from "./Actions/LogoutAction";
import {AuthErrorActionType} from "./Actions/AuthErrorAction";
import {AuthSuccessActionType} from "./Actions/AuthSuccessAction";
import {AuthStatusInitActionType} from "./Actions/AuthStatusInitAction";

export type AuthState = {
  user?: any;
  authSuccess?: boolean
  authError?: string
};
const initialState: AuthState = {};

type Action =
  LoginActionType
  | LogoutActionType
  | AuthErrorActionType
  | AuthSuccessActionType
  | AuthStatusInitActionType;

export const AuthReducer = (
  state: AuthState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: undefined,
      };
    }
    case "AUTH_STATUS_INIT": {
      return {
        ...state,
        authSuccess: undefined,
        authError: undefined
      }
    }
    case "AUTH_SUCCESS": {
      return {
        ...state,
        authSuccess: true
      }
    }
    case "AUTH_ERROR": {
      return {
        ...state,
        authSuccess: false,
        authError: action.payload
      }
    }
    default: {
      return state;
    }
  }
};
