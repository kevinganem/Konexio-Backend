// REACT
import React from "react";

export default function Signup() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div>
        <h1 className="text-center">Sign Up</h1>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Comfirm Password
            </label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              First Name
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Surname
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Birth Date
            </label>
            <input type="date" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
