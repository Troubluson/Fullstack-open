import React from "react";

const Person = ({ person, deleteHandler }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => deleteHandler(person.id)}>delete</button>
    </p>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.persons.map((person) => (
        <span key={person.name}>
          <Person person={person} deleteHandler={props.deleteHandler} />
        </span>
      ))}
    </div>
  );
};

export default Persons;
