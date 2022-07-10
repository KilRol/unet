import Post from "../../../types/Post";

export type DeleteCommentActionType = {
  type: "DELETE_COMMENT";
  payload: Post;
  id: string
};

type DeleteCommentActionCreator = (payload: Post, id: string) => DeleteCommentActionType;

export const DeleteCommentAction: DeleteCommentActionCreator = (payload: Post, id: string) => {
  return {
    type: "DELETE_COMMENT",
    payload,
    id
  } as const;
};
