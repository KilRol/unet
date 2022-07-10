export type LogoutDBActionType = {
  type: "LOGOUT_DB";
};

type LogoutDBActionCreator = () => LogoutDBActionType;

export const LogoutDBAction: LogoutDBActionCreator = () =>
  ({
    type: "LOGOUT_DB",
  } as const);
