import { useState, useEffect, Fragment } from "react";
// import DeleteModal from "./DeleteModal";
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

const DepartmentList = () => {
  const [department, setdepartment] = useState([]);
  const navigate = useNavigate();

  const loaddepartment = async () => {
    const response = await fetch("http://localhost:4000/departments");
    const data = await response.json();
    setdepartment(data);
  };

  useEffect(() => {
    loaddepartment();
  }, []);

  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Departamentos
            </Typography>

            <Button
              variant="outlined"
              color="success"
              size="large"
              onClick={() => navigate("/department/new")}
            >
              Crear Departamento
            </Button>
          </Toolbar>
        </Container>
      </Box>

      {department.map((departments) => (
        <Fragment key={departments.id_department}>
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
                  {departments.id_department} {departments.description} 
                </Typography>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate(`/department/${departments.id_department}/edit`)}
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

export default DepartmentList;
