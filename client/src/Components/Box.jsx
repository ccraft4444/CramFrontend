import React, { useState } from "react";

function Box() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select a PDF file");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please drop a PDF file");
    }
    setIsDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="file-input"
        className={`file-upload-box ${isDragOver ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <>
            <p>Click or drag and drop a PDF file here to upload</p>
            <input
              type="file"
              id="file-input"
              onChange={handleFileInputChange}
              accept="application/pdf"
            />
          </>
        )}
      </label>
      <button type="submit" disabled={!selectedFile}>
        Submit
      </button>
    </form>
  );
}

export default Box;
