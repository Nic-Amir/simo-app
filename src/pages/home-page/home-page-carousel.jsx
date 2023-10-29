import React, { useEffect, useState } from "react";
import Service from "../../services/coingecko-service";
import { GlobalState } from "../../GlobalContext";
import AliceCarousel from "react-alice-carousel";
import TickerCard from "../../components/ticker-card";

const HomePageCarousel = () => {
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

  const responsive = {
    0: { items: 1 },
    824: { items: 2 },
    1150: { items: 3 },
    1600: { items: 4 },
  };

  const coins = trending.map((coin) => {
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

export default HomePageCarousel;