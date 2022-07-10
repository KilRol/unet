import {AuthDBState} from "../AuthDBReducer";

export type LoginDBActionType = {
  type: "LOGIN_DB";
  payload: any;
};

type LoginDBActionCreator = (payload: any) => LoginDBActionType;

export const LoginDBAction: LoginDBActionCreator = (payload: AuthDBState) => {
  return {
    type: "LOGIN_DB",
    payload,
  } as const;
};
