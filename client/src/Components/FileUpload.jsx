import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./fileUpload.css";
import { Link } from "react-router-dom";

export default function FileUploader({ onStudyGuideChange, onRouteChange }) {
  const { fetchMe, updateCredits, selectedUser, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  // const handleFileInputChange = (event) => {
  //   setSelectedFiles([...event.target.files]);
  // };

  const handleFileInputChange = (event) => {
    setSelectedFiles((prevState) => {
      const newFiles = Array.from(event.target.files).filter((newFile) => {
        return !prevState.some(
          (existingFile) => existingFile.name === newFile.name
        );
      });
      return [...prevState, ...newFiles];
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFiles.length) {
      return;
    }

    console.log(selectedFiles);
    const formData = new FormData();

    // Append each file to the FormData
    selectedFiles.forEach((file, index) => {
      formData.append(`pdfFile${index}`, file);
    });

    fetch("/routes/documents/extract-text", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.text(); // Use response.text() instead of response.json()
      })
      .then((extractedText) => {
        console.log("Extracted texts:", extractedText);

        // Now you have an array of extracted texts, you can process them as needed
        onStudyGuideChange(extractedText, () => {
          navigate("/tools");
        });
      })
      .catch((error) => {
        console.error(error);
        setError("Error extracting text");
      });
  };

  return (
    <div className="primaryContainer">
      <div className="uploadForm">
        <div className="links">
          <div className="selected1">Upload</div>
          <div className="not-selected">Tools</div>
        </div>
        <div className="form-row">
          <form onSubmit={handleFormSubmit}>
            <div className="upload-container">
              <input
                className="inp"
                type="file"
                onChange={handleFileInputChange}
                accept="application/pdf"
                multiple
              />
            </div>
            <button type="submit">Upload</button>
          </form>
          <div className="text-container">
            <div className="tx">
              Drag and Drop files into the box on the left
            </div>
            <div className="txx">Files Uploaded:</div>
            <div className="tx">
              {selectedFiles.map((file) => {
                return <div>{file.name}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
