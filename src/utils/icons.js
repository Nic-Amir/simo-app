import WLDAUD from "../assets/WLDAUD.svg";
import WLDUSD from "../assets/WLDUSD.svg";
import WLDGBP from "../assets/WLDGBP.svg";
import WLDEUR from "../assets/WLDEUR.svg";
import cryBTCUSD from "../assets/cryBTCUSD.svg";
import cryETHUSD from "../assets/cryETHUSD.svg";

const iconMap = {
  cryBTCUSD,
  cryETHUSD,
  WLDAUD,
  WLDGBP,
  WLDEUR,
  WLDUSD,
};

export const getIcon = (symbol) => {
  return iconMap[symbol] || null;
};
