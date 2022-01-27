import React from "react";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div data-testid={type} className={type}>
      {message}
    </div>
  );
};

export default Notification;
