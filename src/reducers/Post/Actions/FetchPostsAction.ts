import Post from "../../../types/Post";

export type FetchPostsActionType = {
  type: "FETCH_POST";
  payload: Post[];
};

type FetchPostsActionCreator = (payload: Post[]) => FetchPostsActionType;

export const FetchPostsAction: FetchPostsActionCreator = (payload: Post[]) => {
  return {
    type: "FETCH_POST",
    payload,
  } as const;
};
