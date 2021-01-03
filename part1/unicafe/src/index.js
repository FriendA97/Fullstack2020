import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <table>
    <tbody>
      <tr>
        <th>{text}</th>
        <td>{value}</td>
      </tr>
    </tbody>
  </table>
);

const Statistics = ({ values }) => {
  const [good, neutral, bad] = values;
  return (
    <>
      {values.filter((value) => value > 0).length === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + bad + neutral} />
          <Statistic
            text="average"
            value={(good - bad) / (good + bad + neutral)}
          />
          <Statistic
            text="positive"
            value={(good / (good + bad + neutral)) * 100}
          />
        </>
      )}
    </>
  );
};

export default Button;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h1>satistics</h1>
      <Statistics values={[good, neutral, bad]} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
