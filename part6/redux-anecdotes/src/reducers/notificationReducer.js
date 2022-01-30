const inintalState = "";

const createNoti = (content, delay) => {
  return (dispatch) => {
    dispatch(setNoti(content));
    setTimeout(() => dispatch(removeNoti()), delay);
  };
};

const setNoti = (content) => {
  return {
    type: "SET_MESSAGE",
    payload: content,
  };
};

const removeNoti = () => {
  return { type: "CLEAR_MESSAGE", payload: "" };
};

const reducer = (state = inintalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_MESSAGE":
      return payload;
    case "CLEAR_MESSAGE":
      return payload;
    default:
      return state;
  }
};

export { setNoti, createNoti, removeNoti, reducer };
