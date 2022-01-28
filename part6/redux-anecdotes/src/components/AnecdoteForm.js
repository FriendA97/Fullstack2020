import React from "react";
import { useDispatch } from "react-redux";
import { actionCreate } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(actionCreate(content));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
