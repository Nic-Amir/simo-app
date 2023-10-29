import React, { useEffect, useState } from "react";
import Service from "../../services/coingecko-service";
import { GlobalState } from "../../GlobalContext";
import AliceCarousel from "react-alice-carousel";
import TickerCard from "../../components/ticker-card";
import { getActiveSymbols } from "../../services/derivapi-service";
import {getIcon}  from "../../utils/icons";
const HomePageDerivapiCarousel = () => {
  const { currency, symbol } = GlobalState();

  const [activeSymbols, setActiveSymbols] = useState([]);

  useEffect(() => {
    getActiveSymbols().then(data => {
      setActiveSymbols(data.active_symbols
        .filter(obj =>  obj.symbol_type === "cryptocurrency"));
    });
    console.log("carousel: ", activeSymbols)
  }, [currency]);

  const responsive = {
    0: { items: 1 },
    824: { items: 2 },
    1150: { items: 3 },
    1600: { items: 4 },
  };

  const coins = activeSymbols.map((coin) => {

    return (
      <TickerCard
        icon={getIcon(coin.symbol)} // TODO: dynamically render the icon since it's not in API
        title={coin.symbol}
        description={coin.display_name}
        symbol={symbol}
        price={
          coin.current_price > 1
            ? Service.addCommas(coin?.current_price)
            : coin?.current_price
        }
        is_profit={
          Service.isProfit(coin?.price_change_percentage_24h) ? "+" : "-"
        }
        percentage={parseFloat(coin?.price_change_percentage_24h).toFixed(2)}
        redirect={`/coins/${coin.symbol}`}
      />
    );
  });

  return (
    <div >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={coins}
      />
    </div>
  );
};

export default HomePageDerivapiCarousel;