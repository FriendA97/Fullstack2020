import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const noti = useSelector((state) => state.noti);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{noti}</div>;
};

export default Notification;
