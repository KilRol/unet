import Post from "../../../types/Post";

export type AddCommentActionType = {
  type: "ADD_COMMENT";
  payload: Post;
  id: string
};

type AddCommentActionCreator = (payload: Post, id: string) => AddCommentActionType;

export const AddCommentAction: AddCommentActionCreator = (payload: Post, id: string) => {
  return {
    type: "ADD_COMMENT",
    payload,
    id
  } as const;
};
