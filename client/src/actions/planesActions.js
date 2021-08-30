import axios from "axios";

export const setPlanesAction = () => async (dispatch, getState) => {
  const planes = await axios.get(
    "https://my-flight-schedule.herokuapp.com/api/planes"
  );
  dispatch({
    type: "SET_PLANES2",
    payload: planes.data,
  });
};

// export const setPlanesAction = (planes) => {
//   return {
//     type: "SET_PLANES",
//     payload: planes,
//   };
// };
