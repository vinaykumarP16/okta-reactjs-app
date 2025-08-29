import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography
} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import PersonalAccount from "./components/PersonalAccount/PersonalAccount";
import theme from './theme';

// Example components for routing
function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              mx: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff'
              }
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/personal-account"
            startIcon={<AccountCircleIcon />}
            sx={{
              mx: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#fff'
              }
            }}
          >
            Personal Account
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal-account" element={<PersonalAccount />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
