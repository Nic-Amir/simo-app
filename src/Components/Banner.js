import { makeStyles } from "tss-react/mui";
import React from "react";
import { Container, Typography } from "@mui/material";
import financebanner from "../asset/financebanner.jpg";
import HomeCarousel from "./HomeCarousel";

const useStyles = makeStyles()(() => ({
  banner: {
    backgroundPosition: "center center",
    background: `url(${financebanner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    display: "flex",
    justifyContent: "center",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
}));

const Banner = () => {
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
        <HomeCarousel />
      </Container>
    </div>
  );
};

export default Banner;
