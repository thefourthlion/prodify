import React from "react";
import "../styles/Home.css";
import AddTask from "../components/AddTask";
import DailyCheck from "../components/DailyCheck";
const Home = () => {
  return (
    <div className="Home pages">
      <DailyCheck/>
    </div>
  );
};
export default Home;
