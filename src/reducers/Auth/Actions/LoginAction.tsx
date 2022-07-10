import {AuthState} from "../AuthReducer";

export type LoginActionType = {
  type: "LOGIN";
  payload: any;
};

type LoginActionCreator = (payload: any) => LoginActionType;

export const LoginAction: LoginActionCreator = (payload: AuthState) => {
  return {
    type: "LOGIN",
    payload,
  } as const;
};
