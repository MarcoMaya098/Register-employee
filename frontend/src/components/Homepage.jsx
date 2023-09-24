// import EmployeeList from "./EmployeeList";
// import DepartmentList from "./DepartmentList";
import Navbar from "./Navbar";
import EmployeeTable from "./EmployeeTable";
import DepartmenTable from "./DepartmenTable";

function Homepage() {
  return (
    <div>
      <Navbar />
      {/* <DepartmentList /> */}
      {/* <EmployeeList /> */}
      <DepartmenTable />
      <EmployeeTable />

    </div>
  );
}

export default Homepage;
