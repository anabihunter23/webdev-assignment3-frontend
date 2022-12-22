import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllEmployeesView = (props) => {
  if (!props.allEmployees.length) {
    return (
      <div>
        <div>There are no employees.</div>
        <Link to={`/newemployee`}>
          <button>Add New Employee</button>
        </Link>
        <Link to={`/`}>
          <button>Return Home</button>
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
              <h1>{name}</h1>
            </Link>
            <p>{employee.department}</p>
            <button onClick={() => props.deleteEmployee(employee.id)}>
              Delete This Employee
            </button>
          </div>
        );
      })}
      <Link to={`/newemployee`}>
        <button>Add New Employee</button>
      </Link>
      <Link to={`/`}>
        <button>Return Home</button>
      </Link>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;
