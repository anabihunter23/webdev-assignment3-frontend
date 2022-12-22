import { Link } from "react-router-dom";

const HomePageView = () => {
  return (
    <div>
      <h1>Employee and Task Management App</h1>
      <h3>An application to manage your employees and assign them tasks</h3>
      <div>
        <Link to={"/employees"}> List of Employees </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={"/tasks"}> List of Tasks </Link>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <img
        src="https://t3.ftcdn.net/jpg/02/49/05/82/360_F_249058233_0MIaTy9WXtKHF0eacUSg9c3hkV9ehIbX.jpg"
        alt="employeesimage"
      />
    </div>
  );
};

export default HomePageView;
