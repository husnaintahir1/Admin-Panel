import React from "react";
import "../../css/DashboardCard.css";
function DashboardCard({ color, title, count }) {
  return (
    <div className="col-3 mt-4">
      <div className={`card ${color}`}>
        <h4>{title}</h4>
        <h1>{count}</h1>
        <button className="btn">More Info</button>
      </div>
    </div>
  );
}

export default DashboardCard;
