export const userStatus = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case userStatus.LOGIN:
      return { user: action.payload };
    case userStatus.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};
