import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllEmployeesView = (props) => {
  if (!props.allEmployees.length) {
    return (
      <div>
        <br></br>
        <div>There are no employees.</div>
        <br></br>
        <Link to={`/newemployee`}>
          <button>Add New Employee</button>
        </Link>
        <Link to={`/`}>
          <h5>Return Home</h5>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {props.allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id}>
            <Link to={`/employee/${employee.id}`}>
              <h2>{name}</h2>
            </Link>
            <p>{employee.department}</p>
            <button onClick={() => props.deleteEmployee(employee.id)}>
              Delete This Employee
            </button>
          </div>
        );
      })}
      <br></br>
      <br></br>
      <Link to={`/newemployee`}>
        <button>Add New Employee</button>
      </Link>
      <Link to={`/`}>
        <h5>Return Home</h5>
      </Link>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;
