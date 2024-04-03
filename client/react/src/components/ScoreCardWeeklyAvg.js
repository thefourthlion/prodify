import React, { useEffect, useState } from "react";
import axios from "axios";

const ScoreCardWeeklyAvg = () => {
  const [weeklyScores, setWeeklyScores] = useState([]);
  const [totalPossibleScore, setTotalPossibleScore] = useState("");
  const [scorePercentage, setScorePercentage] = useState("");
  const [scoreGrade, setScoreGrade] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/dailycheck/read?limit=7"
      );
      const data = response.data;
      setWeeklyScores(data);
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
      setTotalPossibleScore(total.toString());
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  const calculateWeeklyAverage = () => {
    const totalPoints = weeklyScores.reduce((acc, curr) => acc + parseFloat(curr.points), 0);
    const average = totalPoints / weeklyScores.length;
    return average.toFixed(2);
  };

  const calculateScorePercentageAndGrade = (weeklyAverage) => {
    const total = parseFloat(totalPossibleScore);

    if (isNaN(weeklyAverage) || isNaN(total)) {
      console.error(
        "Invalid input: weeklyAverage or totalPossibleScore is not a number."
      );
      setScorePercentage("0");
      setScoreGrade("F");
      return;
    }

    if (total > 0) {
      const percentage = Math.round((weeklyAverage / total) * 100);
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
    if (weeklyScores.length > 0 && totalPossibleScore !== "") {
      const weeklyAverage = calculateWeeklyAverage();
      calculateScorePercentageAndGrade(weeklyAverage);
    }
  }, [weeklyScores, totalPossibleScore]);

  return (
    <div className="ScoreCardWeeklyAvg">
      <div className="score-container">
        <h1 className="content-header">Weekly Score</h1>
        {weeklyScores.length > 0 ? (
          <div>
            <h3>{calculateWeeklyAverage()}/{totalPossibleScore}</h3>
            <h3>{scoreGrade} - {scorePercentage}%</h3>
          </div>
        ) : (
          <h1>No Entries For This Week</h1>
        )}
      </div>
    </div>
  );
};

export default ScoreCardWeeklyAvg;
