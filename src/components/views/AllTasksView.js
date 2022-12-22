import { Link } from "react-router-dom";

const AllTasksView = (props) => {
  let { tasks, deleteTask } = props;
  //tasks = [{id: 300, description: "hello"}]
  if (!tasks.length) {
    return (
      <div>
        <p>There are no tasks.</p>
        <Link to={`/newtask`}>
          <button>Add New Task</button>
        </Link>
        <br></br>
        <br></br>
        <Link to={`/`}>
          <button>Return Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => {
        let description = task.description;
        return (
          <div key={task.id}>
            <Link to={`/task/${task.id}`}>
              <h1>{description}</h1>
            </Link>
            <button onClick={() => deleteTask(task.id)}>
              Delete This Task
            </button>
          </div>
        );
      })}
      <br></br>
      <br></br>
      <Link to={`/newtask`}>
        <button>Add A New Task</button>
      </Link>
      <br></br>
      <br></br>
      <Link to={`/`}>
        <button>Return Home</button>
      </Link>
    </div>
  );
};

export default AllTasksView;
