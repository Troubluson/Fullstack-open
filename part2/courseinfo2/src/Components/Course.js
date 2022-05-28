import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Header = ({ course }) => <h2>{course.name}</h2>;
const Content = ({ course }) => (
  <div>
    {course.parts.map((part) => (
      <Part name={part.name} exercises={part.exercises} key={part.id} />
    ))}
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
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

export default Course;
