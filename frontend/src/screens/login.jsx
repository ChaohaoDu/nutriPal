import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/initFirebase";

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  return (
    <div
      className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5 vh-100 align-items-center"
      style={{
         backgroundImage: `url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80)`,
         backgroundSize: "cover",
         backgroundPosition: "center",
       }}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">NutriPal</h1>
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-3"
                  placeholder="name@example.com"
                  id="usernameInput"
                />
                <label htmlFor="usernameInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-3"
                  placeholder="Password"
                  id="passwordInput"
                />
                <label htmlFor="passwordinput">Password</label>
                {err && (
                  <small className="ms-2" style={{ color: "#ff0033" }}>
                    Something went wrong
                  </small>
                )}
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                type="submit"
              >
                Login
              </button>

              <small className="text-body-secondary">
                Don't have an account?{" "}
                <Link to="/register" className="link-primary">
                  {" "}
                  Register
                </Link>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
