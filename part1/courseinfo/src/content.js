import Part from "./part";

const Content = ({ parts }) => {
  const { name: name1, exercises: ex1 } = parts[0];
  const { name: name2, exercises: ex2 } = parts[1];
  const { name: name3, exercises: ex3 } = parts[2];

  return (
    <div>
      <Part name={name1} exercise={ex1} />
      <Part name={name2} exercise={ex2} />
      <Part name={name3} exercise={ex3} />
    </div>
  );
};

export default Content;
