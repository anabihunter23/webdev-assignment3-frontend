import { Link } from "react-router-dom";

const HomePageView = () => {
  return (
    <div>
      <h1>Web Dev Assignment 3 (Employee/Task App)</h1>
      <h3>No styling was done</h3>
      <Link to={"/employees"}> List of Employees </Link>
      <br></br>
      <br></br>
      <Link to={"/tasks"}> List of Tasks </Link>
    </div>
  );
};

export default HomePageView;
