import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import LeftComponent from "../components/leftComponent";
import RightComponent from "../components/rightComponent";

const Dashboard = () => {
  return (
    <div className="d-flex">
      <div style={{ width: "300px" }}>
        <LeftComponent />
      </div>
      <div style={{ flex: "1" }}>
        <RightComponent />
      </div>
    </div>
  );
};

export default Dashboard;
