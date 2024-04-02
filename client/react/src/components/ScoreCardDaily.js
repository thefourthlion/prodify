import React, { useEffect, useState } from "react";
import axios from "axios";
import getDate from "../services/date";

const ScoreCardDaily = () => {
  const [dailyScore, setDailyScore] = useState("");
  const [dailyData, setDailyData] = useState([]);
  const [totalPossibleScore, setTotalPossibleScore] = useState("");
  const [scorePercentage, setScorePercentage] = useState("");
  const [scoreGrade, setScoreGrade] = useState("");
  const date = getDate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/dailycheck/read?limit=1"
      );
      const data = response.data[0];
      setDailyData(response.data);
      setDailyScore(data.points);
      await getTotalPossibleScore();
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTotalPossibleScore = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/tasks/read");
      const data = response.data;
      const total = data.reduce(
        (acc, curr) => acc + parseFloat(curr.points),
        0
      );
      setTotalPossibleScore(total.toString(), calculateScorePercentageAndGrade);
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  const calculateScorePercentageAndGrade = () => {
    const daily = parseFloat(dailyScore);
    const total = parseFloat(totalPossibleScore);

    if (isNaN(daily) || isNaN(total)) {
      console.error(
        "Invalid input: dailyScore or totalPossibleScore is not a number."
      );
      setScorePercentage("0");
      setScoreGrade("F");
      return;
    }

    if (total > 0) {
      const percentage = Math.round((daily / total) * 100);
      setScorePercentage(percentage.toString());

      let grade;
      if (percentage >= 90) {
        grade = "A";
      } else if (percentage >= 80) {
        grade = "B";
      } else if (percentage >= 70) {
        grade = "C";
      } else if (percentage >= 60) {
        grade = "D";
      } else {
        grade = "F";
      }
      setScoreGrade(grade);
    } else {
      console.error("Invalid totalPossibleScore: must be greater than 0.");
      setScorePercentage("0");
      setScoreGrade("F");
    }
  };

  useEffect(() => {
    if (dailyScore && totalPossibleScore) {
      calculateScorePercentageAndGrade();
    }
  }, [dailyScore, totalPossibleScore]);

  return (
    <div className="ScoreCardDaily">
      <div className="container">
        
          <h1 className="content-header">Daily Score</h1>
          {dailyData.map((data) => (
            <div>
              {data.date == date ? (
                <div>
                  <h1>
                    {data.points}/{totalPossibleScore}
                  </h1>
                  <h1>
                    {scoreGrade} - {scorePercentage}%
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

export default ScoreCardDaily;
