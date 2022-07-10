import User from "../../../types/User";

export type FetchUserListActionType = {
  type: "FETCH_USERS"
  payload: User[]
}

export type FetchUserListActionCreator = (payload: User[]) => FetchUserListActionType

export const FetchUserListAction: FetchUserListActionCreator = (payload: User[]) => {
  return {
    type: "FETCH_USERS",
    payload
  } as const;
}
