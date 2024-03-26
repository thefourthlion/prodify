import React, { useEffect, useState } from "react";
import axios from "axios";
import getDate from "../services/date";
const ScoreCard = () => {
  const [dailyScore, setDailyScore] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const totalPossibleScore = 100;
  const date = getDate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/dailycheck/read?limit=1"
      );
      const data = response.data[0];
      setDailyData(response.data);
      console.log(data);
      setDailyScore(data.points);
      console.log(data.points);
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
        {dailyData.map((data) => (
          <div>
            {data.date == date ? (
              <div>
                <h1>{data.date}</h1>
                <h1>Daily Score</h1>
                <h1>
                  {data.points}/{totalPossibleScore}
                </h1>
              </div>
            ) : (
              <h1>No Entry For Today</h1>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ScoreCard;
