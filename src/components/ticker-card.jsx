import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TickerCard = ({
  icon,
  title,
  description,
  symbol,
  price,
  is_profit,
  percentage,
  redirect,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        padding: 30,
        margin: 15,
        borderRadius: "15px",
        background: "rgba(79, 58, 84, 0.52)",
        boxShadow: "0px 0px 105px 45px 0px 0px 105px 45px ",
      }}
      onClick={() => navigate(redirect)}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <img src={icon} alt={icon} height="70" />
        <div style={{ marginLeft: 10 }}>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", fontFamily: "Roboto" }}
          >
            {title.toUpperCase()}
          </Typography>
          <Typography variant="h6" style={{ fontFamily: "Roboto" }}>
            {description}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography variant="h4" style={{ fontFamily: "Roboto" }}>
            {symbol}
            {price}
          </Typography>
          <div
            style={{
              padding: 5,
              borderRadius: 5,
              backgroundColor: percentage > 0 ? "green" : "red",
            }}
          >
            {is_profit}
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerCard;
