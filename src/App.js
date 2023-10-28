import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";
import Homepage from "./pages/home-page/home-page";
import AssetDetailsPage from "./pages/asset-details-page";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:coin" element={<AssetDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
