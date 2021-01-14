import React from "react";
import "../css/DashBoard.css";
import "bootstrap/dist/css/bootstrap.css";
import DashboardCard from "./common/DashboardCard";
function DashBoard() {
  return (
    <div className="dashBoard  container-fluid">
      <h4>
        Dashboard <span>Control panel</span>
      </h4>
      <div className="row">
        <DashboardCard title="Categories" count={6} color="bg-danger" />
        <DashboardCard title="Categories" count={6} color="bg-danger" />
        <DashboardCard title="Categories" count={6} color="bg-danger" />
        <DashboardCard title="Categories" count={6} color="bg-danger" />
      </div>
    </div>
  );
}

export default DashBoard;
