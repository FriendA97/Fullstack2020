const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const actionVote = (id) => {
  return {
    type: "VOTE",
    payload: id,
  };
};

const actionCreate = (content) => {
  return {
    type: "CREATE",
    payload: content,
  };
};

const initialState = anecdotesAtStart.map(asObject);
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "VOTE":
      const votedAnec = { ...state.find((el) => el.id === payload) };
      votedAnec.votes += 1;
      return state
        .map((anec) => (anec.id === payload ? votedAnec : anec))
        .sort((a, b) => b.votes - a.votes);
    case "CREATE":
      const newAnec = asObject(payload);
      return [...state, newAnec].sort((a, b) => b.votes - a.votes);
    default:
      return state;
  }
};

export { reducer, actionVote, actionCreate };
