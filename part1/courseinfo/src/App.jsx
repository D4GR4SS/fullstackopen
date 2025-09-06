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
  // const-definitions

  const Header = (props) => {
    return <h1>{props.course.name}</h1>;
  };

  const Part = () => {
    return (
      <>
        {course.parts.map((part) => (
          <p key={part.exercises}>
            {part.name} {part.exercises}
          </p>
        ))}
      </>
    );
  };

  const Content = (props) => {
    return <Part parts={props.parts} />;
  };

  const Total = (props) => {
    return (
      <p>
        Number of exercises{" "}
        {props.course.parts.reduce(
          (total, part) => (total += part.exercises),
          0
        )}
      </p>
    );
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
