import React, { useEffect, useState } from "react";
import getTimestamp from "../services/timestamp";
import axios from "axios";
import refreshPage from "../services/refresh";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [points, setPoints] = useState();
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

  const totalPoints = tasks.reduce(
    (total, task) => total + parseFloat(task.points, 10),
    0
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="AddTask page">
      <div className="container">
        <h1 className="content-header">AddTask</h1>

        <FloatingLabel className="form-label" label="Task">
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
        </FloatingLabel>

        <br />

        <FloatingLabel className="form-label" label="Points">
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Points"
            value={points}
            onChange={(e) => {
              setPoints(e.target.value);
            }}
          />
        </FloatingLabel>

        <h1>{task}</h1>
        
        <button
          onClick={() => {
            createData();
          }}
          type="submit"
          className="button"
        >
          Submit
        </button>

        <div className="task-container">

        {tasks.map((task) => (
          <div key={task._id}>
            <h4>
              {task.task} | {task.points} points{" "}
              <span
              className="delete-btn"
                onClick={() => {
                  deleteData(task._id);
                }}
              >
                ⛔
              </span>
            </h4>
          </div>
        ))}

        <h1 className="points-header">Points: {totalPoints}</h1>
        </div>
      </div>
    </div>
  );
};
export default AddTask;
