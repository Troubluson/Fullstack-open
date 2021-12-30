import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input onChange={props.nameHandler} />
        </div>
        <div>
          number: <input onChange={props.numberHandler} />
        </div>
        <div>
          <button type="submit" onClick={props.personAdder}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
