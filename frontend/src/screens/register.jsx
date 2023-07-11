import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/initFirebase";

function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      await updateProfile(user, {displayName: username});
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
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
            <h1 className="fw-bold mb-0 fs-2">Register</h1>
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="usernameInput"
                  placeholder="Username"
                />
                <label htmlFor="usernameInput">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="emailInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="emailInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-3"
                  id="passwordInput"
                  placeholder="Password"
                />
                <label htmlFor="passwordInput">Password</label>
                {err && (
                  <small className="ms-2" style={{ color: "#ff0033" }}>
                    Something went wrong
                  </small>
                )}
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                type="submit"
                disabled={loading}
              >
                Register
              </button>

              <small className="text-body-secondary">
                Already have an account?{" "}
                <Link to="/login" className="link-primary">
                  Login
                </Link>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
