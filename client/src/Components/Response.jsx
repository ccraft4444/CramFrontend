import { useNavigate } from "react-router-dom";
import "./response.css";

export default function Response({ response }) {
  const navigate = useNavigate();
  return (
    <div className="contain">
      <h1 className="textington">Your study tools are ready!</h1>
      <hr />
      <div className="text3">
        Copy your tools from the textbox below and follow the instructions to
        upload the tools to Quizlet.
      </div>
      <div className="text3">Good luck on your test!</div>

      <textarea
        className="return"
        style={{
          height: "200px",
          overflowY: "scroll",
          overflow: "hidden",
          resize: "none",
        }}
        value={response}
      />

      <h1 className="quiz">Upload to quizlet (flashcards)</h1>
      <hr />
      <ls>
        <li>Copy your study tools</li>
        <li>
          Go to{" "}
          <a
            href="https://www.quizlet.com/create-set"
            target="_blank"
            rel="noopener noreferrer"
          >
            quizlet.com/create-set
          </a>
        </li>
        <li>Click the + import button</li>
        <li>Paste your copied tools</li>
        <li>Click the Comma button bellow your data</li>
        <li>Click the import button</li>
      </ls>
      <button className="butt" onClick={() => navigate("/fileupload")}>
        Create More Tools
      </button>
    </div>
  );
}
