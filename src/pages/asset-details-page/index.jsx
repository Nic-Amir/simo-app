import React from "react";
import { useParams } from "react-router-dom";

const AssetDetailsPage = () => {
  const params = useParams();

  return <h1>{params.coin}</h1>;
};

export default AssetDetailsPage;