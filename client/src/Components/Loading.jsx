import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loading.css";
import loadingGif from "./CramLoadingGif.gif";
import { Link } from "react-router-dom";

export default function Loading({ onResponseChange, studyGuide, route }) {
  const [display, setDisplay] = useState("Initialized");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("sg in loading", studyGuide);
    async function fetchData() {
      const result = await axios.post(`/routes/langChain/${route}`, {
        studyGuide,
      });
      onResponseChange(result.data);
    }
    fetchData();
    navTime();
    displaySetter();
  }, [studyGuide, route]);

  function navTime() {
    setTimeout(() => {
      navigate("/response");
    }, 5000);
  }

  function displaySetter() {
    setTimeout(() => {
      setDisplay("Studying Documents");
    }, 1500);
    setTimeout(() => {
      setDisplay("Completed");
    }, 3000);
  }

  return (
    <div className="container">
      <h1>Cramming in progress</h1>
      <hr />
      <img src={loadingGif} alt="Loading" className="gif" />

      <div className="disp">{display}</div>

      <p className="sit">
        Sit tight while our systems analyze your documents and build your custom
        tools
      </p>

      <Link to="https://discord.gg/egEWKgadqU" className="tep">
        Join Discord for support
      </Link>
    </div>
  );
}
