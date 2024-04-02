import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const ScoreCardChart = () => {
  const [pointsData, setPointsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/dailycheck/read");
      const formattedData = response.data.map((item, index) => ({
        name: item.date || `Record ${index + 1}`,
        points: parseInt(item.points, 10),
      }));
      // Reverse the data array
      setPointsData(formattedData.reverse());
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ScoreCardChart">
      <div className="container">
        <h1 className="content-header">Score Card Chart</h1>

        <LineChart width={500} height={300} data={pointsData}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="points" stroke="#8884d8" />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default ScoreCardChart;
