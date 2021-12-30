import React from "react";

const Filter = (props) => {
  return (
    <div>
      filter: <input onChange={props.inputHandler} />
    </div>
  );
};

export default Filter;
