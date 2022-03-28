// REACT
import React, { useContext } from "react";
// CONTEXT
import { UserContext } from "../context/userContext";
// ROUTER
import { useHistory } from "react-router-dom";

export default function Login() {
  const { users, setUsers, setAuth, isLogged } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = () => {
    setAuth();
    history.push("/");
  };

  return isLogged ? (
    <div className="d-flex justify-content-center p-3">
      <div onClick={onSubmit} className="btn btn-danger">
        Logout
      </div>
    </div>
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center">Login</h1>
    </div>
  );
}
