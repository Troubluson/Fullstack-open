import React from "react";

const Header = ({ course }) => <h1>{course.name}</h1>;
const Content = ({ course }) => (
  <div>
    <Part name={course.parts[0].name} exercises={course.parts[0].exercises} />
    <Part name={course.parts[1].name} exercises={course.parts[1].exercises} />
    <Part name={course.parts[2].name} exercises={course.parts[2].exercises} />
  </div>
);
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ course }) => {
  const total = course.parts.reduce(
    (total, current) => total + current.exercises,
    0
  );
  return <p>number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
