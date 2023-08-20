import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../GlobalContext";
import { makeStyles } from "tss-react/mui";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = GlobalState();

  const useStyles = makeStyles()(() => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Roboto",
      fontWeight: "bold",
      cursor: "pointer",
      textAlign: "center",
    },
  }));

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const { classes } = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar
            style={{
              justifyContent: "space-between",
            }}
          >
            <div onClick={() => navigate("/")}>
              <Typography className={classes.title}>VolGuard</Typography>
              <Typography className={classes.title}>(placeholder)</Typography>
            </div>

            <Select
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}> USD </MenuItem>
              <MenuItem value={"MYR"}> MYR </MenuItem>
              <MenuItem value={"EUR"}> EUR </MenuItem>
              <MenuItem value={"JPY"}> JPY </MenuItem>
              <MenuItem value={"GBP"}> GBP </MenuItem>
              <MenuItem value={"AUD"}> AUD </MenuItem>
              <MenuItem value={"CAD"}> CAD </MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
