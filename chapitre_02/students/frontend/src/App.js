// REACT
import React from "react";
// COMPONENTS
import SimpleForm from "./components/Form";
import Students from "./components/Students";

export default function App() {
  return (
    <>
      <div>
        <SimpleForm />
      </div>
      <div>
        <Students />
      </div>
    </>
  );
}
