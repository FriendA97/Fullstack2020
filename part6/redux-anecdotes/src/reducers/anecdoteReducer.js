import { getAll, create, put } from "../services/anecdoteServices";

// Async action creators
const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    anecdotes.sort((a, b) => b.votes - a.votes);
    dispatch(actionInit(anecdotes));
  };
};

const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await create(content);
    dispatch(actionCreate(anecdote));
  };
};

const voteAnecdote = (id) => {
  return async (dispatch) => {
    const data = await put(id);
    dispatch(actionVote(data));
  };
};

// Sync action creators
const actionInit = (anecdotes) => {
  return {
    type: "INIT",
    payload: anecdotes,
  };
};

const actionVote = (anecdote) => {
  return {
    type: "VOTE",
    payload: anecdote,
  };
};

const actionCreate = (anecdote) => {
  return {
    type: "CREATE",
    payload: anecdote,
  };
};

const reducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "INIT":
      return payload;
    case "VOTE":
      const votedAnec = { ...state.find((el) => el.id === payload.id) };
      votedAnec.votes += 1;
      return state
        .map((anec) => (anec.id === payload.id ? votedAnec : anec))
        .sort((a, b) => b.votes - a.votes);
    case "CREATE":
      return [...state, payload].sort((a, b) => b.votes - a.votes);
    default:
      return state;
  }
};

export { reducer, initAnecdotes, voteAnecdote, createAnecdote };
