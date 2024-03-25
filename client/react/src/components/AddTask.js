import React, { useEffect, useState } from "react";
import getTimestamp from "../services/timestamp";
import axios from "axios";
import refreshPage from "../services/refresh";
const AddTask = () => {
  const [task, setTask] = useState("");
  const [points, setPoints] = useState(0);
  const timestamp = getTimestamp();

  const [tasks, setTasks] = useState([]);

  const createData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/tasks/create",
        {
          task: task,
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

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/tasks/delete/${id}`);
      console.log("Deleted Item");
      refreshPage();
    } catch (error) {
      console.error("Error Deleting:", error);
    }
  };

  const totalPoints = tasks.reduce((total, task) => total + parseFloat(task.points, 10), 0);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="AddTask">
      <div className="container">
        <h1 className="content-header">AddTask</h1>
        {/* <form onSubmit={createData}> */}
          <input
            placeholder="task"
            type="text"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          ></input>

          <br />

          <input
            placeholder="points"
            type="text"
            onChange={(e) => {
              setPoints(e.target.value);
            }}
          ></input>
          <h1>{task}</h1>
          <p>
            Current Timestamp: <b>{timestamp}</b>
          </p>
          <button onClick={()=>{
            createData()
          }} type="submit">Submit</button>
        {/* </form> */}
        {tasks.map((task) => (
          <div key={task._id}>
            <p>
              {task.task} | {task.points} points{" "}
              <span
                onClick={() => {
                  deleteData(task._id);
                }}
              >
                ⛔
              </span>
            </p>
          </div>
        ))}

        <p>{totalPoints}</p>
      </div>
    </div>
  );
};
export default AddTask;
