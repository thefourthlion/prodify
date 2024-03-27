import React from "react";
import "../styles/Home.css";
import AddTask from "./AddTask";
import DailyCheck from "./DailyCheck";
import ScoreCard from "./ScoreCard";
const Home = () => {
  return (
    <div className="Home pages">
      <ScoreCard/>
    </div>
  );
};
export default Home;
