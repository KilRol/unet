import {LoginDBActionType} from "./actions/LoginDBAction";
import {LogoutDBActionType} from "./actions/LogoutDBAction";

export type AuthDBState = {
  userId?: string;
};
const initialState: AuthDBState = {};

type Action = LoginDBActionType | LogoutDBActionType;

export const AuthDBReducer = (
  state: AuthDBState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "LOGIN_DB": {
      return {
        ...state,
        userId: action.payload,
      };
    }
    case "LOGOUT_DB": {
      return {
        ...state,
        userId: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
