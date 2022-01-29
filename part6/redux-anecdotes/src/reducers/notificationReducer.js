const inintalState = "";

const voteNoti = (content) => {
  return {
    type: "VOTE_MESSAGE",
    payload: content,
  };
};

const createNoti = (content) => {
  return {
    type: "CREATE_MESSAGE",
    payload: content,
  };
};

const removeNoti = () => {
  return { type: "CLEAR_MESSAGE", payload: "" };
};

const reducer = (state = inintalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "VOTE_MESSAGE":
      return `You voted for ${payload}`;
    case "CREATE_MESSAGE":
      return `You created ${payload}`;
    case "CLEAR_MESSAGE":
      return payload;
    default:
      return state;
  }
};

export { voteNoti, createNoti, removeNoti, reducer };
