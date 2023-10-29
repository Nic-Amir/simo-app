import React, { useEffect, useState } from "react";
import Service from "../../services/coingecko-service";
import { GlobalState } from "../../GlobalContext";
import AliceCarousel from "react-alice-carousel";
import TickerCard from "../../components/ticker-card";
import { getActiveSymbols } from "../../services/derivapi-service";
import {getIcon}  from "../../utils/icons";
const HomePageCarousel = () => {
  const { currency, symbol } = GlobalState();

  const [activeSymbols, setActiveSymbols] = useState([]);
  const [coingeckoTrending, setCoingeckoTrending] = useState([]);

  useEffect(() => {
   // get coingecko data
   Service.getTrendingCoins(currency)
   .then((response) => {
     setCoingeckoTrending(response.data);
   })
   .catch((err) => {
     console.log(err);
   });
    console.log("carousel: ", coingeckoTrending);
    
    //get derivapi data
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

  const coingecko_coins = coingeckoTrending.map((coin) => {
    return (
      <TickerCard
        icon={coin.image}
        title={coin.symbol}
        description={coin.name}
        symbol={symbol}
        price={
          coin.current_price > 1
            ? Service.addCommas(coin?.current_price)
            : coin?.current_price
        }
        is_profit={
          Service.isProfit(coin?.price_change_percentage_24h) ? "+" : ""
        }
        percentage={parseFloat(coin?.price_change_percentage_24h).toFixed(2)}
        redirect={`/coins/${coin.id}`}
      />
    );
  });

  const deriv_symbols = activeSymbols.map((d_symbol) => {
    return (
      <TickerCard
        icon={getIcon(d_symbol.symbol)} // TODO: dynamically render the icon since it's not in API
        title={d_symbol.symbol}
        description={d_symbol.display_name}
        symbol={symbol}
        price={
          d_symbol.current_price > 1
            ? Service.addCommas(d_symbol?.current_price)
            : d_symbol?.current_price
        }
        is_profit={
          Service.isProfit(d_symbol?.price_change_percentage_24h) ? "+" : "-"
        }
        percentage={parseFloat(d_symbol?.price_change_percentage_24h).toFixed(2)}
        redirect={`/coins/${d_symbol.symbol}`}
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
        items={coingecko_coins}
      />
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={deriv_symbols}
      />
    </div>
  );
};

export default HomePageCarousel;