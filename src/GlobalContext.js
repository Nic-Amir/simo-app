import React, { createContext, useContext, useEffect, useState } from "react";

const Global = createContext();

const GlobalContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "MYR") setSymbol("RM");
    else if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "JPY") setSymbol("¥");
    else if (currency === "GBP") setSymbol("£");
    else if (currency === "AUD") setSymbol("$");
    else if (currency === "CAD") setSymbol("$");
  }, [currency]);

  return (
    <Global.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Global.Provider>
  );
};

export default GlobalContext;

export const GlobalState = () => {
  return useContext(Global);
};
