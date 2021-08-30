import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Userpage.scss";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Optionbar from "../../components/Optionbar/Optionbar";
import UserInfoModal from "../../components/UserInfoModal/UserInfoModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsersAction,
  selectUserAction,
  instructorRoleAction,
} from "../../actions/userActions";
import { setPlanesAction } from "../../actions/planesActions";

export default function Userpage(props) {
  //All the States
  const [visibility, setVisibility] = useState(false);
  const [userInfoModalVisibility, setUserInfoModalVisibility] = useState(false);
  // const [user, setUser] = useState();
  const [editToggle, setEditToggle] = useState(false);

  //Redux Selector
  const users = useSelector((state) => state.users.users);
  const sidebarToggle = useSelector((state) => state.sidebarToggle);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Setting the Instructor Array
  let instructorArr = users.filter((user) => user.role === "Instructor");
  dispatch(instructorRoleAction(instructorArr));

  //Modal Show and Hidden Functions
  const showModal = () => {
    setVisibility(true);
  };

  const hideModal = () => {
    setVisibility(false);
  };

  const showUserInfoModal = () => {
    setUserInfoModalVisibility(true);
  };

  const hideUserInfoModal = () => {
    setUserInfoModalVisibility(false);
  };

  const headerToken = {
    headers: { "auth-token": localStorage.getItem("token") },
  };

  //Axios call URL
  const planeURL = "http://localhost:5000/api/planes";
  const userInfo__URL = "http://localhost:5000/api/users";
  const userId = props[0].match.params.id;

  //Axios Call Function
  const axiosPlaneCall = () => {
    // axios
    //   .get(planeURL)
    //   .then((res) => {
    //     dispatch(setPlanesAction(res.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    dispatch(setPlanesAction());
  };

  const axiosUserRoleCall = () => {
    // axios.get(userInfo__URL).then((res) => {
    //   let data = res.data;
    //   // setUserRole(data);
    //   dispatch(setUsersAction(data));
    // });
    dispatch(setUsersAction());
  };

  const axiosUserIdCall = () => {
    // axios
    //   .get(`${userInfo__URL}/${userId}`)
    //   .then((res) => {
    //     setUser(res.data);
    //     dispatch(selectUserAction(res.data));
    //   })
    //   .catch((err) => {
    //     console.log("Fetch User ID info error");
    //   });
    dispatch(selectUserAction(userId));
  };

  // const axiosSaveFilterCall = (filterValue) => {
  //   let loggedInUser = { ...user };
  //   loggedInUser.filter.push({
  //     name: "Filter",
  //     aircraft: filterValue.aircraft,
  //     instructor: filterValue.instructor,
  //   });
  //   console.log(loggedInUser);
  //   axios
  //     .put(
  //       `${userInfo__URL}/${userId}`,
  //       {
  //         $set: {
  //           filter: [
  //             ...loggedInUser.filter,
  //             {
  //               name: "filter",
  //               aircraft: loggedInUser.aircraft,
  //               instructor: loggedInUser.instructor,
  //             },
  //           ],
  //         },
  //       },
  //       headerToken
  //     )
  //     .then((res) => {
  //       console.log("Save Filter Success");
  //     })
  //     .catch((err) => {
  //       console.log("Save filter failed");
  //     });
  // };

  //arr which only has Instructors

  //User Edit Page Submit Function
  const submitHandler = (state, name, phone, dateOfBirth, role) => {
    hideUserInfoModal();
    axios
      .put(
        `${userInfo__URL}/${userId}`,
        {
          name: state.name,
          email: state.email,
          phone: state.phone,
          dateOfBirth: state.dateOfBirth,
          role: state.role,
        },
        headerToken
      )
      .then((res) => {
        setEditToggle((editToggle) => false);
        alert("User Info has been edited");
        axiosUserIdCall();
      })
      .catch((err) => {
        console.log("Token has Expired");
      });
  };

  useEffect(() => {
    axiosUserIdCall();
    axiosPlaneCall();
    axiosUserRoleCall();
  }, [editToggle, dispatch]);

  if (!localStorage.getItem("token")) {
    alert("Your token has expired");
    return <Redirect to={`/`} />;
  }
  return (
    <div className="userpage">
      <div class={sidebarToggle ? "app__sidebar--open" : "app__sidebar--close"}>
        <Sidebar />
      </div>
      <div
        class={
          sidebarToggle
            ? "app__content app__content--open "
            : "app__content app__content--close"
        }
      >
        <Navbar
          props={props[0]}
          history={props[0].history}
          showUserInfoModal={showUserInfoModal}
        />
        <button onClick={showModal} className="main">
          Create a Reservation
        </button>
        <Optionbar
          showBookingModal={showModal}
          visibility={visibility}
          hideModal={hideModal}
          // axiosSaveFilterCall={axiosSaveFilterCall}
        />
        {/* <Modal visibility={visibility} hideModal={hideModal} /> */}
        <UserInfoModal
          visibility={userInfoModalVisibility}
          hideModal={hideUserInfoModal}
          user={user}
          submitHandler={submitHandler}
          axiosUserIdCall={axiosUserIdCall}
          editToggle={editToggle}
          setEditToggle={setEditToggle}
        />
      </div>
    </div>
  );
}
