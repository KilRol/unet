import {FetchPostsActionType} from "./Actions/FetchPostsAction";
import {AddPostActionType} from "./Actions/AddPostAction";
import Post from "../../types/Post";
import {DeletePostActionType} from "./Actions/DeletePostAction";
import {AddCommentActionType} from "./Actions/AddCommentAction";
import {DeleteCommentActionType} from "./Actions/DeleteCommentAction";
import {SetLikeActionType} from "./Actions/SetLikeAction";
import {UnsetLikeActionType} from "./Actions/UnsetLikeAction";

type Action =
  FetchPostsActionType
  | AddPostActionType
  | DeletePostActionType
  | AddCommentActionType
  | DeleteCommentActionType
  | SetLikeActionType
  | UnsetLikeActionType

export type PostReducerType = {
  posts: Post[];
};
const initialState = {
  posts: [],
};

export const PostReducer = (
  state: PostReducerType = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_POST": {
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    }
    case "DELETE_POST": {
      return {
        ...state,
        posts: [...state.posts].filter(e => e.id !== action.payload)
      }
    }
    case "FETCH_POST": {
      return {
        ...state,
        posts: action.payload
      }
    }
    case "ADD_COMMENT": {
      return {
        ...state,
        posts: [...[...state.posts].filter(post => post.id !== action.id), action.payload]
      }
    }
    case "DELETE_COMMENT": {
      return {
        ...state,
        posts: [...[...state.posts].filter(post => post.id !== action.id), action.payload]
      }
    }
    case "SET_LIKE": {
      return {
        ...state,
        posts: [...[...state.posts].filter(post => post.id !== action.id), action.payload]
      }
    }
    case "UNSET_LIKE": {
      return {
        ...state,
        posts: [...[...state.posts].filter(post => post.id !== action.id), action.payload]
      }
    }
    default: {
      return state;
    }
  }
};
