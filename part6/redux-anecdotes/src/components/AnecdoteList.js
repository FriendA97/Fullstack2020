import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { createNoti } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const searchResults = useSelector((state) => state.filter.results);
  const dispatch = useDispatch();

  const voteClick = async (id, content) => {
    await dispatch(voteAnecdote(id));
    dispatch(createNoti(`You voted for ${content}`, 5000));
  };
  const anecdotesArray = searchResults.length > 0 ? searchResults : anecdotes;
  return (
    <>
      {anecdotesArray.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteClick(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
