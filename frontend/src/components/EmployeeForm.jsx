import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Date from "./Date";
import dayjs from "dayjs";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EmployeeForm = () => {
  const [employee, setemployee] = useState({
    name: "",
    birthday: "",
    address: "",
    id_department: "",
    date_start: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [departments, setdepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/departments");
        const data = await response.json();
        setdepartments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDepartmentChange = (event) => {
    const selectedDepartmentValue = event.target.value;

    setemployee((prevemployee) => ({
      ...prevemployee,
      id_department: selectedDepartmentValue,
    }));
  };

  useEffect(() => {
    if (params.idemployee) {
      loademployee(params.idemployee);
    }
  }, [params.idemployee]);

  const loademployee = async (idemployee) => {
    //const res = await fetch(`http://localhost:4000/person/${id}`, {
    const res = await fetch("http://localhost:4000/employees/" + idemployee);
    const data = await res.json();
    console.log(data);
    setemployee({
      name: data.name,
      address: data.address,
      birthday: data.birthday.split("T")[0],
      id_department: data.id_department,
      date_start: data.date_start.split("T")[0],
    });

    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const response = await fetch(
          "http://localhost:4000/employees/" + params.idemployee,
          {
            method: "PUT",
            body: JSON.stringify(employee),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:4000/employees", {
          method: "POST",
          body: JSON.stringify(employee),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await response.json();
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) =>
    setemployee({ ...employee, [e.target.name]: e.target.value });

  console.log(employee);
  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Grid item xs={12} md={6}>
        <Card
          sx={{ mt: 5, p: 3 }}
          style={{
            backgroundColor: "#1E272E",
            width: "80%",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Update Employee" : "Create Employee"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Nombre"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="name"
                onChange={handleChange}
                value={employee.name}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Date
                label="Fecha de Nacimiento"
                name="birthday"
                value={dayjs(employee.birthday)}
                onChange={handleChange}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                  color: "white",
                }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                variant="filled"
                label="Direccion"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="address"
                onChange={handleChange}
                value={employee.address}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Date
                label="Fecha de Ingreso"
                name="date_start"
                value={dayjs(employee.date_start)}
                onChange={handleChange}
                sxStyles={{
                  display: "block",
                  margin: ".5rem 0",
                  color: "white",
                }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <FormControl variant="filled" fullWidth>
                <InputLabel style={{ color: "white" }}>Departmento</InputLabel>
                <Select
                  value={employee.id_department}
                  onChange={handleDepartmentChange}
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{ style: { color: "white" } }}
                >
                  {departments.map((department) => (
                    <MenuItem
                      key={department.id_department}
                      value={department.id_department}
                    >
                      {department.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  !employee.name ||
                  !employee.birthday ||
                  !employee.address ||
                  !employee.id_department ||
                  !employee.date_start
                }
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
