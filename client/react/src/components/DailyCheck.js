import React, { useEffect, useState } from "react";
import axios from "axios";
import getDate from "../services/date";
import getTimestamp from "../services/timestamp";
import refreshPage from "../services/refresh";

const DailyCheck = () => {
  const [tasks, setTasks] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [points, setPoints] = useState("");

  const date = getDate();
  const timestamp = getTimestamp();

  const createData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/dailycheck/create",
        {
          date: date,
          tasks: tasksDone,
          points: points,
          timestamp: timestamp,
        }
      );

      console.log(response.data);
      refreshPage();
    } catch (error) {
      console.error("Error Posting Data", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/tasks/read");
      setTasks(response.data);
    } catch (error) {
      console.error("Error Fetching Data", error);
    }
  };

  const getTotalPoints = () => {
    const totalPoints = tasksDone.reduce((acc, currentItem) => {
      return acc + Number(currentItem.points);
    }, 0);
    console.log(totalPoints);
    setPoints(totalPoints);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="DailyCheck">
      <div className="container">
        <h1 className="content-header">DailyCheck</h1>

        {tasks.map((task) => (
          <div key={task._id}>
            <p>
              <input
                type="checkbox"
                onClick={() => {
                  setTasksDone([
                    ...tasksDone,
                    { task: task.task, points: task.points },
                  ]);
                }}
              />
              {task.task} | {task.points} points{" "}
            </p>
          </div>
        ))}

        <button
          onClick={() => {
            getTotalPoints();
            createData();
          }}
        >
          log
        </button>

        <h1>{points}</h1>
      </div>
    </div>
  );
};
export default DailyCheck;
