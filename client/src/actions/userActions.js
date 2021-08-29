import axios from "axios";

export const setUsersAction2 = () => async (dispatch, getState) => {
  const users = await axios.get("http://localhost:5000/api/users");
  dispatch({
    type: "SET_USERS",
    payload: users,
  });
};

// export const setUsersAction = (user) => {
//   return {
//     type: "SET_USERS",
//     payload: user,
//   };
// };

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
