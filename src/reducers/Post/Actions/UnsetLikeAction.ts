import Post from "../../../types/Post";

export type UnsetLikeActionType = {
  type: "UNSET_LIKE"
  payload: Post
  id: string
}

type UnsetLikeActionCreator = (payload: Post, id: string) => UnsetLikeActionType

export const UnsetLikeAction: UnsetLikeActionCreator = (payload: Post, id: string) => {
  return {
    type: "UNSET_LIKE",
    payload,
    id
  } as const;
}
