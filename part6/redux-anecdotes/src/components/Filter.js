import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchFilter } from "../reducers/filterReducer";

const Filter = () => {
  const filter = useSelector((state) => state.filter.searchStr);
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(searchFilter(event.target.value, anecdotes));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  );
};

export default Filter;
