import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchEmployeeThunk, editEmployeeThunk } from "../../store/thunks";

class EditEmployeeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      department: "",
      redirect: false,
      redirectId: null,
      error: "",
    };
  }

  componentDidMount() {
    //getting employee ID from url
    this.props.fetchEmployee(this.props.match.params.id);
    this.setState({
      firstname: this.props.employee.firstname,
      lastname: this.props.employee.lastname,
      department: this.props.employee.department,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //get new info for employee from form input
    if (this.state.firstname === "") {
      this.setState({ error: "Error: First name cannot be empty" });
      return;
    }

    let employee = {
      id: this.props.employee.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department: this.state.department,
    };
    console.log(employee);
    this.props.editEmployee(employee);

    this.setState({
      redirect: true,
      redirectId: this.props.employee.id,
    });
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    let { employee } = this.props;

    //go to single employee view of the edited employee
    if (this.state.redirect) {
      return <Redirect to={`/employee/${this.state.redirectId}`} />;
    }

    return (
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
            Edit Employee
          </h2>
        </div>
        <label style={{ color: "#11153e", fontWeight: "bold" }}>
          First Name:{" "}
        </label>
        <input
          type="text"
          name="firstname"
          value={this.state.firstname}
          placeholder={employee.firstname}
          onChange={(e) => this.handleChange(e)}
        />
        <br />
        <br />

        <label style={{ color: "#11153e", fontWeight: "bold" }}>
          Last Name:{" "}
        </label>
        <input
          type="text"
          name="lastname"
          value={this.state.lastname || ""}
          placeholder={employee.lastname}
          onChange={(e) => this.handleChange(e)}
        />
        <br />
        <br />

        <label style={{ color: "#11153e", fontWeight: "bold" }}>
          Department:{" "}
        </label>
        <input
          type="text"
          name="department"
          value={this.state.department || ""}
          placeholder={employee.department}
          onChange={(e) => this.handleChange(e)}
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    employee: state.employee,
  };
};

const mapDispatch = (dispatch) => {
  return {
    editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
    fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(EditEmployeeContainer);
