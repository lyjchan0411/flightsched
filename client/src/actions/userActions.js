import axios from "axios";

export const setUsersAction = () => async (dispatch, getState) => {
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

export const selectUserAction = (id) => async (dispatch, getState) => {
  const user = await axios.get(`http://localhost:5000/api/users/${id}`);
  dispatch({
    type: "SELECT_USER",
    payload: user.data,
  });
};

// export const selectUserAction = (user) => {
//   return {
//     type: "SELECT_USER",
//     payload: user,
//   };
// };

export const instructorRoleAction = (users) => {
  return {
    type: "SET_INSTRUCTORS",
    payload: users,
  };
};
