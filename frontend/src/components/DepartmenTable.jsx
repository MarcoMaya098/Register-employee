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

export default function DepartmenTable() {
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

  // const handleDelete = async (id_department) => {
  //   try {
  //     await fetch(`http://localhost:4000/departments/${id_department}`, {
  //       method: "DELETE",
  //     });
  //     setdepartment(
  //       department.filter(
  //         (departments) => departments.id_department !== id_department
  //       )
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No. #</StyledTableCell>
              <StyledTableCell align="right">
                Nombre del departamento
              </StyledTableCell>
              <StyledTableCell align="right">Editar</StyledTableCell>
              {/* <StyledTableCell align="right">Eliminar</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {department.map((row) => (
              <StyledTableRow key={row.id_department}>
                <StyledTableCell align="right">
                  {row.id_department}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      navigate(`/department/${row.id_department}/edit`)
                    }
                  >
                    U
                  </Button>
                </StyledTableCell>

                {/* <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(row.id_department)}
                    style={{ marginLeft: ".5rem" }}
                  >
                    D
                  </Button>
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
