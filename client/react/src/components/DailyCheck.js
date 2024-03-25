import React, { useEffect, useState } from "react";
import axios from "axios";
import getDate from "../services/date";
const DailyCheck = () => {
    const [tasks, setTasks] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3002/api/tasks/read");
          setTasks(response.data);
        } catch (error) {
          console.error("Error Fetching Data", error);
        }
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

                <input type="checkbox" onClick={()=>{
                    setTasksDone([...tasksDone, { task: task.task, points: task.points }])
                }}/>
              {task.task} | {task.points} points{" "}
             
            </p>
          </div>
        ))}

<button onClick={(()=>{console.log(tasksDone)})}>log</button>
      </div>
    </div>
  );
};
export default DailyCheck;
