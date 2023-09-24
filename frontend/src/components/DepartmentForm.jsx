import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const DepartmentForm = () => {
  const [department, setdepartment] = useState({
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id_department) {
      loaddepartment(params.id_department);
    }
  }, [params.id_department]);

  const loaddepartment = async (id_department) => {
    const res = await fetch(
      "http://localhost:4000/departments/" + id_department
    );
    const data = await res.json();
    // console.log(data);
    setdepartment({
      description: data.description,
    });

    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const response = await fetch(
          "http://localhost:4000/departments/" + params.id_department,
          {
            method: "PUT",
            body: JSON.stringify(department),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:4000/departments", {
          method: "POST",
          body: JSON.stringify(department),
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
    setdepartment({ ...department, [e.target.name]: e.target.value });

    console.log(department)
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
            {editing ? "Update Department" : "Create Department"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Nuevo departamento"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                onChange={handleChange}
                value={department.description}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!department.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DepartmentForm;
