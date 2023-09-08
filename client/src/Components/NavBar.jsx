import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const { selectedUser, fetchMe, logoutUser } = useAuth();
  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <div class="flex justify-evenly items-center bg-slate-700 mb-6">
      {selectedUser.username === "Guest" ? (
        <>
          {/* <button
            className="log"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button> */}
        </>
      ) : null}

      {selectedUser.username !== "Guest" ? (
        <>
          <button
            className="log"
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
          >
            Logout
          </button>{" "}
        </>
      ) : null}
    </div>
  );
}
