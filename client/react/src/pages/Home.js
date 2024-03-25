import React from "react";
import "../styles/Home.css";
import AddTask from "../components/AddTask";
import DailyCheck from "../components/DailyCheck";
import ScoreCard from "../components/ScoreCard";
const Home = () => {
  return (
    <div className="Home pages">
      <ScoreCard/>
    </div>
  );
};
export default Home;
