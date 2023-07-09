import React, { useEffect } from "react";
import askGpt, { askGpt2 } from "../services/chatgptService";

const Dashboard = () => {
  // askGpt2().then((res) => {console.log(res)});

  useEffect(() => {
    console.log(askGpt("hello"));
  }, []);

  return <div></div>;
};

export default Dashboard;
