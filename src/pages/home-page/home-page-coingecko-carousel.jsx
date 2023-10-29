import React, { useEffect, useState } from "react";
import { GlobalState } from "../../GlobalContext";
import Service from "../../services/coingecko-service";
import AliceCarousel from "react-alice-carousel";
import TickerCard from "../../components/ticker-card";

const HomePageCoingeckoCarousel = () => {
  const { currency, symbol } = GlobalState();

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
    </div>
  );
};

export default HomePageCoingeckoCarousel;