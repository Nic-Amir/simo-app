import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import "./App.css";
import Homepage from "./Pages/Homepage";
import { makeStyles } from "tss-react/mui";

function App() {
  const useStyles = makeStyles()((theme) => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const { classes } = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
