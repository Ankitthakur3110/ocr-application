import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose File");
  const [words, setWords] = useState([]);
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    } else {
      setFile(null);
      setFilename('');
    }
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setWords([]);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/uploadfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        },
      );
      setWords(res?.data?.output?.words || []);
    } catch (err) {
      setError(err?.response?.data?.msg || 'Something went wrong');
    }
    setUploading(false);
  };

  return (
    <>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{error}.</strong>
          <button
            type="button"
            className="close"
            onClick={() => setError("")}
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            accept="image/*"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        {isUploading ? (
          <button
            className="btn btn-primary btn-block mt-4"
            type="button"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Uploading...
          </button>
        ) : (
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        )}
      </form>
      {words.length && !isUploading ? (
        <div
          style={{
            wordBreak: "break-all",
            marginTop: "10px",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          <h4 className="display-4 text-center mb-4">Extracted Text</h4>
          {words.map((word, idx) => {
            return (
              <span key={idx} style={{ marginRight: "5px" }}>
                {word.text}
              </span>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;
