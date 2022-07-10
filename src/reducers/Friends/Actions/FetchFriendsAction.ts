import User from "../../../types/User";

export type FetchFriendsActionType = {
  type: "FETCH_FRIENDS"
  payload: User[]
}

type FetchFriendsActionCreator = (payload: User[]) => FetchFriendsActionType

export const FetchFriendsAction: FetchFriendsActionCreator = (payload) => {
  return {
    type: "FETCH_FRIENDS",
    payload
  } as const;
}
