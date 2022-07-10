export type LogoutActionType = {
  type: "LOGOUT";
};

type LogoutActionCreator = () => LogoutActionType;

export const LogoutAction: LogoutActionCreator = () =>
  ({
    type: "LOGOUT",
  } as const);
