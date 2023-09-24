import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Toolbar,
  Box,
  Container,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const EmployeeList = () => {
  const [employee, setemployee] = useState([]);
  const navigate = useNavigate();

  const loademployee = async () => {
    const response = await fetch("http://localhost:4000/employees");
    const data = await response.json();
    setemployee(data);
  };

  useEffect(() => {
    loademployee();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Empleados
            </Typography>

            <Button
              variant="outlined"
              color="success"
              size="large"
              onClick={() => navigate("/employee/new")}
            >
              Crear empleado
            </Button>
          </Toolbar>
        </Container>
      </Box>

      {employee.map((employees) => (
        <Fragment key={employees.id_employee}>
          <Card
            style={{
              marginBottom: ".7rem",
              backgroundColor: "#1e272e",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  color: "white",
                }}
              >
                <Typography>
                  {employees.name} {employees.date_start.split("T")[0]} {employees.address}
                </Typography>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate(`/employee/${employees.id_employee}/edit`)}
                >
                  Editar
                </Button>

               
              </div>
            </CardContent>
          </Card>
        </Fragment>
      ))}
    </>
  );
};

export default EmployeeList;
