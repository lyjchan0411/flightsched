const initialState = {
  planes: [],
};

export const planesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLANES":
      return (state = { planes: action.payload });
    default:
      return state;
  }
};
