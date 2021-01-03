import Part from "./Part";

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} />
      ))}
      <p>
        total of{" "}
        {course.parts.reduce((accum, part) => accum + part.exercises, 0)}{" "}
        exercises{" "}
      </p>
    </div>
  );
};

export default Content;
