import { Link } from "react-router-dom";

const TaskView = (props) => {
  const { task } = props;
  return (
    <div>
      <h1>{task.description}</h1>
      {task.employee ? (
        <Link to={`/employee/${task.employeeId}`}>
          <h2>{task.employee.firstname + " " + task.employee.lastname}</h2>
        </Link>
      ) : (
        <h3>Unassigned</h3>
      )}
      <h4>
        Priority Level: {task.priority}, Status: {task.completion}
      </h4>
      <Link to={`/edittask/${task.id}`}>Edit this task's information</Link>
      <br />
      <Link to={`/tasks`}>View all current tasks</Link>
    </div>
  );
};

export default TaskView;
