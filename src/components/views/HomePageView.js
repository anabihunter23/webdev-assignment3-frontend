import { Link } from "react-router-dom";

const HomePageView = () => {
  return (
    <div>
      <h1>Final Project (Employee/Task App)</h1>
      <Link to={"/employees"}> List of Employees </Link>
      <br></br>
      <br></br>
      <Link to={"/tasks"}> List of Tasks </Link>
    </div>
  );
};

export default HomePageView;
