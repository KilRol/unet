import User from "../../../types/User";

export type FetchUserActionType = {
  type: "FETCH_USER"
  payload: User
}

export type FetchUserActionCreator = (payload: User) => FetchUserActionType

export const FetchUserAction: FetchUserActionCreator = (payload: User) => {
  return {
    type: "FETCH_USER",
    payload
  } as const;
}
