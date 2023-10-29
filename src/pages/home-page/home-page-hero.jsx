import { makeStyles } from "tss-react/mui";
import React from "react";
import { Container, Typography } from "@mui/material";
import FinanceBanner from "../../assets/financebanner.jpg";
import HomePageCarousel from "./home-page-carousel";

const useStyles = makeStyles()(() => ({
  banner: {
    backgroundPosition: "center center",
    background: `url(${FinanceBanner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    display: "flex",
    justifyContent: "center",
    height:"70vh",
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
}));

const HomePageHero = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <Typography
          variant="h1"
          style={{ fontFamily: "Roboto", color: "white", fontWeight: "bold" }}
        >
          VolGuard
        </Typography>
        <HomePageCarousel />
      </Container>
    </div>
  );
};

export default HomePageHero;