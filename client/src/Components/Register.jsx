import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const { createUser, fetchMe } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [password1, setPassword1] = useState("");
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <div className="signup-form">
        <h4>Sign up</h4>
        <hr className="loginHr" />
        {error ? (
          <>
            <h3>{error}</h3>
          </>
        ) : null}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              if (password == password1) {
                await createUser({ email, password });
              } else {
                setError("Passwords must match");
              }
            } catch (error) {
              setError("Username is taken");
              setEmail("");
              setPassword("");
            }
          }}
        >
          <div>
            <div>
              <div className="label">Email</div>
              <input
                for="grid-first-name"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="label">Password</div>
              <input
                for="grid-last-name"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="label">Confirm Password</div>
              <input
                for="grid-last-name"
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button className="login-submit" type="submit">
              Sign Up 🡢
            </button>
          </div>
        </form>
        <a className="texp">Already have an account? </a>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
