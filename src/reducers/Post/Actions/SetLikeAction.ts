import Post from "../../../types/Post";

export type SetLikeActionType = {
  type: "SET_LIKE"
  payload: Post
  id: string
}

type SetLikeActionCreator = (payload: Post, id: string) => SetLikeActionType

export const SetLikeAction: SetLikeActionCreator = (payload: Post, id: string) => {
  return {
    type: "SET_LIKE",
    payload,
    id
  } as const;
}
