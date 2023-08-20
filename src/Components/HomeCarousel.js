import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Service from "../Services/Service";
import { GlobalState } from "../GlobalContext";
import AliceCarousel from "react-alice-carousel";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollElement: {
    boxShadow: "0px 0px 105px 45px 0px 0px 105px 45px ",
  },
}));

const HomeCarousel = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { currency, symbol } = GlobalState();

  const [trending, setTrending] = useState([]);

  const getTrendingCoins = (e) => {
    Service.getTrendingCoins(e)
      .then((response) => {
        setTrending(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTrendingCoins(currency);
  }, [currency]);

  console.log(trending);

  //   const items = [1, 2, 3, 4, 5];

  const responsive = {
    0: { items: 1 },
    824: { items: 2 },
    1150: { items: 3 },
    1600: { items: 4 },
  };

  const items = trending.map((coin) => {
    return (
      <div
        className={classes.scrollElement}
        onClick={() => navigate(`/coins/${coin.id}`)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          padding: 30,
          margin: 15,
          borderRadius: "15px",
          background: "rgba(79, 58, 84, 0.52)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <img src={coin?.image} alt={coin.name} height="70" />
          <div style={{ marginLeft: 10 }}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", fontFamily: "Roboto" }}
            >
              {coin?.symbol.toUpperCase()}
            </Typography>
            <Typography variant="h6" style={{ fontFamily: "Roboto" }}>
              {coin?.name}
            </Typography>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="h4" style={{ fontFamily: "Roboto" }}>
              {symbol}
              {coin?.current_price > 1
                ? Service.addCommas(coin?.current_price)
                : coin?.current_price}
            </Typography>
            <div
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor:
                  coin?.price_change_percentage_24h > 0 ? "green" : "red",
              }}
            >
              {Service.isProfit(coin?.price_change_percentage_24h) ? "+" : ""}
              {parseFloat(coin?.price_change_percentage_24h).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default HomeCarousel;
