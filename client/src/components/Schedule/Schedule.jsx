import React, { useState, useEffect } from "react";
import "./Schedule.scss";
import Modal from "../../components/Modal/Modal";
import Slot from "../Slot/Slot";
import axios from "axios";

export default function Schedule({ planes, date, showBookingModal, visibility, hideModal }) {
  
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const slotsURL = `http://localhost:5000/api/slots/${date}`;

  const axiosSlotsCall = async () => {
    try {
      const res = await axios.get(slotsURL);
      setSlots(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axiosSlotsCall();
    setLoading(true);
  }, [slotsURL]);
  
  const timeHead = [];
  const planeSlot = [];

  const timeSlot = (totalTime) => {
    for (let i = totalTime; i < totalTime + 15; i++) {
      timeHead.push(
        <th key={i} className="schedule__time-heading">{`${i}:00`}</th>
      );
    }
  };
  timeSlot(8);

  const planeTimeSlot = (totalTime, content) => {
    for (let i = totalTime; i < totalTime + 15; i++) {
      planeSlot.push(
        <td key={i} className="schedule__plane-slot" onClick={showBookingModal}>
          {content}
        </td>
      );
    }
  };
  planeTimeSlot(8, "");

  const timeBlock = (slot) => {
    return(
      <Slot
        id={slot._id}
        startTime={slot.startTime}
        endTime={slot.endTime}
        activityType={slot.activityType}
        aircraft={slot.aircraft}
        instructor={slot.instructor} 
        customer={slot.customer}
        type={slot.type}
        loading={loading}
        slotCall={axiosSlotsCall}
      />
    );
  }

  return (
    <>
      <Modal
        visibility={visibility}
        hideModal={hideModal}
        planes={planes}
        date={date}
        slotCall={axiosSlotsCall}
      />
      <table className="schedule">
        <thead>
          <tr className="schedule__row">
            <th className="schedule__placeholder schedule__time-heading"></th>
            {timeHead}
          </tr>
        </thead>
        <tbody>
          {planes && planesBlock()}
          {/* {planes &&
            planes.map((info) => {
              // const checkReg = (slot) => {
              //   if (
              //     !filterValue ||
              //     (filterValue && filterValue.aircraft === "allAircraft") ||
              //     !filterValue.aircraft
              //   ) {
              //     return slot.aircraft === `${info.reg} ${info.type};
              //   }
              // };
              if (
                !filterValue ||
                (filterValue && filterValue.aircraft === "allAircraft") ||
                !filterValue.aircraft
              ) {
                return (
                  <tr className="schedule__row">
                    <th
                      key={info._id}
                      className={`schedule__placeholder ${info.reg}`}
                    >
                      {`${info.reg} ${info.type}`}
                      {slots
                        .filter((slot) => slot.aircraft === `${info.reg} ${info.type})
                        .map(timeBlock)}
                    </th>
                    {planeSlot}
                  </tr>
                );
              }
              if (filterValue && filterValue.aircraft) {
                return (
                  <tr className="schedule__row">
                    <th
                      key={info._id}
                      className={`schedule__placeholder ${info.reg}`}
                    >
                      {`${info.reg} ${info.type}`}
                      {slots
                        .filter(
                          (slot) => slot.aircraft === filterValue.aircraft
                        )
                        .map(timeBlock)}
                    </th>
                    {planeSlot}
                  </tr>
                );
              }
              return (
                <tr className="schedule__row">
                  <th
                    key={info._id}
                    className={`schedule__placeholder ${info.reg}`}
                  >
                    {`${info.reg} ${info.type}`}
                    {slots.filter(checkReg).map(timeBlock)}
                  </th>
                  {planeSlot}
                </tr>
              );
            })
          }
          <tr className="schedule__row">
            <th className="schedule__placeholder">
              Jensen
              {slots.filter(slot => slot.instructor === "Jensen").map(timeBlock)}
            </th>
            {planeSlot}
          </tr>
          <tr className="schedule__row">
            <th className="schedule__placeholder">
              Josh
              {slots.filter(slot => slot.instructor === "Josh").map(timeBlock)}
            </th>
            {planeSlot}
          </tr>
        </tbody>
      </table>
    </>
  );
}