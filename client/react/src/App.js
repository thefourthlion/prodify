import "./styles/ScoreCardChart.css";
import "./styles/Navigation.css";
import "./styles/ScoreCard.css";
import "./styles/DailyCheck.css";
import "./styles/AddTask.css";
import "./styles/PointCalc.css";
import "./styles/globals.css"
import AddTask from "./pages/AddTask";
import ScoreCard from "./pages/ScoreCard";
import DailyCheck from "./pages/DailyCheck";
import Navigation from "./components/Navigation";
import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="score-card" element={<ScoreCard />} />
            <Route path="daily-check" element={<DailyCheck />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
