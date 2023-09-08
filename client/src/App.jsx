import "./App.css";
import { Route, Routes } from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";
import Purchase from "./Components/Purchase";
import Upload from "./Components/Upload";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import FileUploader from "./Components/FileUpload";
// import StripePayment from "./Components/StripePayment";
import Cancel from "./Components/Cancel";
import Success from "./Components/Success";

import Loading from "./Components/Loading";
import Response from "./Components/Response";
import { useState } from "react";
import Tools from "./Components/Tools";
import { useNavigate } from "react-router-dom";
import Total from "./Total";
import Box from "./Components/Box";

function App() {
  const [studyGuide, setStudyGuide] = useState("");
  const [route, setRoute] = useState("flashcard");
  const [response, setResponse] = useState("");
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
  };

  // await setStudyGuide potentially

  const handleStudyGuideChange = (newStudyGuide) => {
    setStudyGuide(newStudyGuide);
    setTimeout(() => {
      navigate("/tools");
    }, 1000);
    console.log("study guide app", studyGuide);
  };

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const handleResponseChange = (newResponse) => {
    setResponse(newResponse);
  };
  return (
    <div className="App bg-stone-100">
      <Navbar />
      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        {/* <Route path="/" element={<StripePayment />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/tools"
          element={
            <Tools
              studyGuide={studyGuide}
              onRouteChange={handleRouteChange}
              onTotalChange={handleTotalChange}
            />
          }
        />
        <Route path="/total" element={<Total total={total} />} />
        <Route
          path="/loading"
          element={
            <Loading
              onResponseChange={handleResponseChange}
              studyGuide={studyGuide}
              route={route}
            />
          }
        />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/fileUpload"
          element={
            <FileUploader
              onStudyGuideChange={handleStudyGuideChange}
              onRouteChange={handleRouteChange}
            />
          }
        />
        <Route path="/response" element={<Response response={response} />} />
        <Route path="/box" element={<Box />} />
      </Routes>
    </div>
  );
}

export default App;
