const initialState = {
  users: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return (state = { users: action.payload });
    default:
      return state;
  }
};

export const selectUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const instructorRoleReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_INSTRUCTORS":
      return (state = { users: action.payload });
    default:
      return state;
  }
};
