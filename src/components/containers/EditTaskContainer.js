import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import {
  fetchTaskThunk,
  editTaskThunk,
  fetchAllEmployeesThunk,
} from "../../store/thunks";

class EditTaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      priority: 0,
      completion: "",
      employeeId: null,
      redirect: false,
      redirectId: null,
      error: "",
    };
  }

  componentDidMount() {
    //getting task ID from url
    this.props.fetchTask(this.props.match.params.id);
    this.props.fetchEmployees();
    this.setState({
      description: this.props.task.description,
      priority: this.props.task.priority,
      completion: this.props.task.completion,
      employeeId: this.props.task.employeeId,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSelectChange = (event) => {
    if (event.target.value === "employee") {
      this.setState({ employeeId: null });
    } else {
      this.setState({ employeeId: event.target.value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //get new info for task from form input
    if (this.state.description === "") {
      this.setState({ error: "Error: description cannot be empty" });
      return;
    }

    let task = {
      id: this.props.task.id,
      description: this.state.description,
      priority: this.state.priority,
      completion: this.state.completion,
      employeeId: this.state.employeeId,
    };

    this.props.editTask(task);

    this.setState({
      redirect: true,
      redirectId: this.props.task.id,
    });
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    let { task, allEmployees, editTask, fetchTask } = this.props;
    let assignedEmployee = task.employeeId;

    let otherEmployees = allEmployees.filter(
      (employee) => employee.id !== assignedEmployee
    );

    //go to single task view of the edited task
    if (this.state.redirect) {
      return <Redirect to={`/task/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <form
          style={{ textAlign: "center" }}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <div className="formTitle">
            <h2
              style={{
                fontWeight: "bold",
                fontFamily: "Courier, sans-serif",
                fontSize: "20px",
                color: "#11153e",
              }}
            >
              Edit Task
            </h2>
          </div>
          <label style={{ color: "#11153e", fontWeight: "bold" }}>
            Description:{" "}
          </label>
          <input
            type="text"
            name="description"
            value={this.state.description || ""}
            placeholder={task.description}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <br />
          <label style={{ color: "#11153e", fontWeight: "bold" }}>
            Priority:{" "}
          </label>
          <input
            type="text"
            name="priority"
            value={this.state.priority || ""}
            placeholder={task.priority}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <br />
          <label style={{ color: "#11153e", fontWeight: "bold" }}>
            Completion:{" "}
          </label>
          <input
            type="text"
            name="completion"
            value={this.state.completion || ""}
            placeholder={task.completion}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <br />
          <select onChange={(e) => this.handleSelectChange(e)}>
            {task.employee !== null ? (
              <option value={task.employeeId}>
                {task.employee.firstname + " (current)"}
              </option>
            ) : (
              <option value="employee">Unassigned</option>
            )}
            {otherEmployees.map((employee) => {
              return (
                <option value={employee.id} key={employee.id}>
                  {employee.firstname}
                </option>
              );
            })}
            {task.employee !== null && (
              <option value="employee">Unassigned</option>
            )}
          </select>{" "}
          <button type="submit">Submit</button>
        </form>
        <br />
        {this.state.error !== "" && <p>{this.state.error}</p>}

        {task.employeeId !== null ? (
          <div>
            Current employee:{" "}
            <Link to={`/employee/${task.employeeId}`}>
              {task.employee.firstname}
            </Link>{" "}
            <button
              onClick={async () => {
                await editTask({ id: task.id, employeeId: null });
                fetchTask(task.id);
              }}
            >
              Unassign
            </button>
          </div>
        ) : (
          <div> No employee currently assigned </div>
        )}
        {/* <div>
          {" "}
          Other employees
          {otherEmployees.map((employee) => {
            return (
              <div key={employee.id}>
                <Link to={`/employee/${employee.id}`}>
                  <h4>{employee.firstname}</h4>
                </Link>
                <button
                  onClick={async () => {
                    await editTask({ id: task.id, employeeId: employee.id });
                    fetchTask(task.id);
                  }}
                >
                  Assign this employee
                </button>
              </div>
            );
          })}
        </div> */}
      </div>
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
    allEmployees: state.allEmployees,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),
  };
};

export default connect(mapState, mapDispatch)(EditTaskContainer);
