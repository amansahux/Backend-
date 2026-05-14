import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await axios.get("/api/data");
    setData(res?.data?.data);
    // console.log(res)
  };
  // console.log(data);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Data List</h1>
      {data?.map((item) => (
        <div key={item.ID}>
          <h3>{item.name}</h3>
          <p>{item.email}</p>
        </div>
      ))}{" "}
    </div>
  );
};

export default App;
