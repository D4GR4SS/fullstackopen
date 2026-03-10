import Part from './Part';

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <p key={part.exercises}>
        {part.name} {part.exercises}
      </p>
    ))}
  </>
);

export default Content;
