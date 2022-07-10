export type DeletePostActionType = {
  type: "DELETE_POST";
  payload: string;
};

type DeletePostActionCreator = (payload: string) => DeletePostActionType;

export const DeletePostAction: DeletePostActionCreator = (payload: string) => {
  return {
    type: "DELETE_POST",
    payload,
  } as const;
};
