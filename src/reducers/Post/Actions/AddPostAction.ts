import Post from "../../../types/Post";

export type AddPostActionType = {
  type: "ADD_POST";
  payload: Post;
};

type AddPostActionCreator = (payload: Post) => AddPostActionType;

export const AddPostAction: AddPostActionCreator = (payload: Post) => {
  return {
    type: "ADD_POST",
    payload,
  } as const;
};
