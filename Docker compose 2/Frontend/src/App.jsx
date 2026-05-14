import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const App = () => {
  const [data, setdata] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/data");
      let data = await response.data;
      setdata(data.message);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>{data ?data : "Loading..."}</div>;
};

export default App;
