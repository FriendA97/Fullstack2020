import React from "react";
import { useDispatch } from "react-redux";
import { actionCreate } from "../reducers/anecdoteReducer";
import { createNoti, removeNoti } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(actionCreate(content));
    dispatch(createNoti(content));
    setTimeout(() => dispatch(removeNoti()), 5000);
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
