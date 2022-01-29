const initState = { searchStr: "", results: [] };

const searchFilter = (str, anecdotes) => {
  return { type: "SEARCH", payload: { str, anecdotes } };
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SEARCH":
      const { str, anecdotes } = payload;
      const filtered = anecdotes?.filter((anecdote) =>
        anecdote.content.includes(str)
      );
      return { searchStr: str, results: filtered };
    default:
      return state;
  }
};

export { searchFilter, reducer };
