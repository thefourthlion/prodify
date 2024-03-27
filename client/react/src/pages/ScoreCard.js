import React, { useEffect, useState } from "react";
import axios from "axios";
import getDate from "../services/date";
const ScoreCard = () => {
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
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  const getTotalPossibleScore = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/tasks/read");
      const data = response.data;
      const total = data.reduce((acc, curr) => {
        return acc + parseFloat(curr.points);
      }, 0);
      setTotalPossibleScore(total.toString());
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  const calculateScorePercentageAndGrade = () => {
    console.log('Daily Score:', dailyScore); // Debugging
    console.log('Total Possible Score:', totalPossibleScore); // Debugging
  
    // Convert both dailyScore and totalPossibleScore to numbers
    const daily = parseFloat(dailyScore);
    const total = parseFloat(totalPossibleScore);
  
    console.log('Parsed Daily:', daily); // Further Debugging
    console.log('Parsed Total:', total); // Further Debugging
  
    if (isNaN(daily) || isNaN(total)) {
      console.error("Invalid input: dailyScore or totalPossibleScore is not a number.");
      setScorePercentage("0");
      setScoreGrade("F");
      return;
    }
  
    if (total > 0) {
      const percentage = Math.round((daily / total) * 100);
      setScorePercentage(percentage.toString());
  
      let grade;
      if (percentage >= 90) {
        grade = 'A';
      } else if (percentage >= 80) {
        grade = 'B';
      } else if (percentage >= 70) {
        grade = 'C';
      } else if (percentage >= 60) {
        grade = 'D';
      } else {
        grade = 'F';
      }
      setScoreGrade(grade);
    } else {
      console.error("Invalid totalPossibleScore: must be greater than 0.");
      setScorePercentage("0");
      setScoreGrade("F");
    }
  };
  
  useEffect(() => {
    const init = async () => {
      await fetchData();
      await getTotalPossibleScore();
      calculateScorePercentageAndGrade();
    };
  
    init().catch(console.error);
  }, []);
  

  return (
    <div className="ScoreCard page">
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
                <h1>{scorePercentage}%</h1>
                <h1>{scoreGrade}</h1>
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
