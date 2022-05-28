import React, { useState } from "react";

const StasticsLine = (props) => {
  let { text, value } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  let { good, neutral, bad } = props;

  const getTotalCount = () => good + neutral + bad;
  const getAverage = () => (good - bad) / getTotalCount();
  const getPositive = () => (good * 100.0) / getTotalCount();

  if (getTotalCount() > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StasticsLine text={"good"} value={good} />
            <StasticsLine text={"neutral"} value={neutral} />
            <StasticsLine text={"bad"} value={bad} />
            <StasticsLine text={"all"} value={getTotalCount()} />
            <StasticsLine text={"average"} value={getAverage()} />
            <StasticsLine text={"positive"} value={getPositive() + " %"} />
            {/*the line above is not exactly "safe" */}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  //onclick handlers / setters
  const addGood = () => {
    return () => setGood(good + 1);
  };
  const addNeutral = () => {
    return () => setNeutral(neutral + 1);
  };
  const addBad = () => {
    return () => setBad(bad + 1);
  };

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={addGood()} text={"Good"} />
        <Button handleClick={addNeutral()} text={"Neutral"} />
        <Button handleClick={addBad()} text={"Bad"} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
