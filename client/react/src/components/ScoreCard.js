import React, { useEffect, useState } from "react";
import axios from "axios";

const ScoreCard = () => {
  const [dailyScore, setDailyScore] = useState([]);
  const totalPossibleScore = 100;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/dailycheck/read?limit=1"
      );
      const data = response.data[0];
      console.log(data)
      setDailyScore(data.points);
      console.log(data.points)
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ScoreCard">
      <div className="container">
        <h1 className="content-header">ScoreCard</h1>

        <h1>Daily Score</h1>
        <h1>{dailyScore}/{totalPossibleScore}</h1>
      </div>
    </div>
  );
};
export default ScoreCard;
