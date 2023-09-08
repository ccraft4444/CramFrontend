import React, { useState, useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import { PDFDocument } from "pdf-lib";
import pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/legacy/build/pdf.worker.entry";
import useFiles from "../hooks/useFiles";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function UploadPDF() {
  const { createFile } = useFiles();
  const { fetchMe, updateCredits, selectedUser, setUser } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  // useEffect(() => {
  //   fetchMe();
  // }, []);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    if (
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files.length > 0
    ) {
      const droppedFile = event.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileData = event.target.result;
        const currentCredits = selectedUser.credits;
        console.log("curr creds", currentCredits);
        const fileName = file.name;
        try {
          const newTotalCredits = selectedUser.credits - 1;
          const newCredits = await updateCredits({ credits: newTotalCredits });
          setUser({ ...selectedUser, credits: newCredits });
          console.log("selected user", selectedUser);

          console.log("Credits updated successfully!");
          const contentBytes = new Uint8Array(fileData);
          console.log("made content bytes");
          const adjustedBytes =
            contentBytes.length % 2 === 0
              ? contentBytes
              : contentBytes.slice(0, contentBytes.length - 1);
          const contentBuffer = adjustedBytes.buffer;

          console.log("made adjusted bytes", adjustedBytes);

          const contentString = new TextDecoder("ISO-8859-1").decode(
            adjustedBytes
          );
          console.log("content string", contentString);

          // await createFile({
          //   userId: selectedUser.id,
          //   name: fileName,
          //   content: contentString,
          // });
          // setTimeout(() => {
          //   navigate("/Home");
          // }, 0);
        } catch (error) {
          console.log("Error updating credits:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const userCredits = selectedUser.credits;

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        style={{ border: "1px solid black", padding: "20px" }}
      >
        {file ? (
          <p>File name: {file.name}</p>
        ) : (
          <p>Drag and drop a PDF file here or click to select a file.</p>
        )}
        {file && <button onClick={handleUpload}>Upload</button>}
        <input
          type="file"
          accept=".pdf"
          onClick={() => {
            handleFileSelect();
          }}
          style={{ display: "none" }}
        />
      </div>
      <button onClick={() => navigate("/purchase")}>Purchase Credits</button>
    </div>
  );
}
