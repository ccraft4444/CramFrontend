import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./register.css";

export default function Login() {
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <div className="signup-form">
        <h4>Login</h4>
        <hr className="loginHr" />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await loginUser({ email, password });
              navigate("/fileUpload");
            } catch (error) {
              setError("Invalid Credentials");
              setEmail("");
              setPassword("");
            }
          }}
        >
          {error ? (
            <>
              <h3>{error}</h3>
            </>
          ) : null}
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
            <div class="w-full md:w-1/2 px-3">
              <div className="label">Password</div>
              <input
                for="grid-last-name"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button className="login-submit" type="submit">
              Login 🡢
            </button>
          </div>
        </form>
        <a className="texp">Don't have an account? </a>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
}
