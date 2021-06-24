import React from "react";
import { useSelector } from "react-redux";
import "../styles/components/TrendingContainer.css";
import Suggestions from "./Suggestions";

const Trending = () => {
  const postData = useSelector((state) => state.postReducer);

  return (
    <div className="navbar-right">
      <Suggestions />
    </div>
  );
};

export default Trending;
