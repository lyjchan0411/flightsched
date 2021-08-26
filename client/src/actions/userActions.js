export const setUsersAction = (users) => {
  return {
    type: "SET_USERS",
    payload: users,
  };
};

export const selectUserAction = (user) => {
  return {
    type: "SELECT_USER",
    payload: user,
  };
};

export const instructorRoleAction = (users) => {
  return {
    type: "SET_INSTRUCTORS",
    payload: users,
  };
};
