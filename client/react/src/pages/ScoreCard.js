import React from "react";
import ScoreCardChart from "../components/ScoreCardChart";
import ScoreCardWeeklyAvg from "../components/ScoreCardWeeklyAvg";
import ScoreCardDaily from "../components/ScoreCardDaily";
const ScoreCard = () => {
  return (
    <div className="ScoreCard page">
      <div className="container">
       
        <div className="score-container score-cont">
        <ScoreCardDaily />
        </div>

        <div className="score-container score-cont">
          <ScoreCardWeeklyAvg />
        </div>

        <div className="score-container">
          <ScoreCardChart />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
