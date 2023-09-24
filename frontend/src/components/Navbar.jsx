import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();


  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/person" style={{ textDecoration: "none", color: '#aaa'}}>
                RSI
              </Link>
            </Typography>

          
           <Button  
              sx={{ mr: 2 }}
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Department
            </Button>

           
            <Button  
              sx={{ mr: 2 }}
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Employee
            </Button>


            
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
