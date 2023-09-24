import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toolbar, Box, Container, Button, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function EmployeeTable() {
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

  const handleDelete = async (id_employee) => {
    try {
      await fetch(`http://localhost:4000/employees/${id_employee}`, {
        method: "DELETE",
      });
      setemployee(
        employee.filter((employees) => employees.id_employee !== id_employee)
      );
    } catch (error) {
      console.error(error);
    }
  };

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="right">
                Fecha de Nacimiento
              </StyledTableCell>
              <StyledTableCell align="right">Direccion</StyledTableCell>
              <StyledTableCell align="right">Fecha de Ingreso</StyledTableCell>
              <StyledTableCell align="right">Departmento</StyledTableCell>
              <StyledTableCell align="right">
                Antiguedad(dias laborados)
              </StyledTableCell>
              <StyledTableCell align="right">Editar</StyledTableCell>
              <StyledTableCell align="right">Eliminar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.birthday.split("T")[0]}</StyledTableCell>
                <StyledTableCell align="right">{row.address}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.date_start.split("T")[0]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.antiguedad}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      navigate(`/employee/${row.id_employee}/edit`)
                    }
                  >
                    U
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(row.id_employee)}
                    style={{ marginLeft: ".5rem" }}
                  >
                    D
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
