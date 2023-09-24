import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import EmployeeForm from "./components/EmployeeForm";

import DepartmentForm from "./components/DepartmentForm";

import Homepage from "./components/Homepage";

function App() {
  // const isAuthenticated = localStorage.getItem('jwt');
  return (
    <Fragment>
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/employee/new" element={<EmployeeForm />} />
          <Route
            path="/employee/:idemployee/edit"
            element={<EmployeeForm />}
          />

          <Route path="/department/new" element={<DepartmentForm />} />
          <Route
            path="/department/:id_department/edit"
            element={<DepartmentForm />}
          />
        </Routes>
      </Container>
    </Fragment>
  );
}

export default App;
