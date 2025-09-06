const App = () => {
  const course = "Half Stack application development";
  const parts = [
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
  ];
  // const-definitions

  const Header = (props) => {
    return <h1>{props.course}</h1>;
  };

  const Part = () => {
    return (
      <>
        {parts.map((part) => (
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
        {props.parts.reduce((total, part) => (total += part.exercises), 0)}
      </p>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
