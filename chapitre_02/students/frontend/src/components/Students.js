// REACT
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";

export default function Students() {
  const [studentsAPI, setStudentsAPI] = useState([]);

  useEffect(() => {
    console.log("Initializing...");
    axios.get("http://localhost:8000/students").then((res) => {
      setStudentsAPI(res.data);
      console.log(res.data);
    });
  }, []);

  const list = () => {
    console.log(studentsAPI);
    return studentsAPI.length > 0 ? (
      studentsAPI.map((res, i) => <p key={i}>{res.name}</p>)
    ) : (
      <div class="spinner-border text-primary" role="status" />
    );
  };
  return (
    <div>
      <h1>Students List</h1>
      <div>{list}</div>
    </div>
  );
}
