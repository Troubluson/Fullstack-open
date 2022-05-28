import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const initalPoints = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([...initalPoints]);

  // let's try using a object to store it for once
  const [mostPopular, setMostPopular] = useState({
    index: 0,
    votes: 0,
  });
  const selectRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const giveVote = () => {
    let newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
    updateMostPopular(selected, newVotes[selected]);
  };
  const updateMostPopular = (index, voteCount) => {
    if (voteCount > mostPopular.votes) {
      setMostPopular({
        index: index,
        votes: voteCount,
      });
    }
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <small>has {votes[selected]} votes</small>
        <br />
      </div>
      <button onClick={giveVote}>Vote</button>
      <button onClick={selectRandom}>Next Anecdote</button>
      <div>
        <h1>Anecdote with the most votes</h1>
        <p>{anecdotes[mostPopular.index]}</p>
        <small>has {mostPopular.votes} votes</small>
      </div>
    </div>
  );
};

export default App;
