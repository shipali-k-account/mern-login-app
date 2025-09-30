import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload/csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload CSV & Distribute</h2>

      {/* Styled file input */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 20,
        }}
      >
        <label
          htmlFor="file-upload"
          style={{
            padding: "10px 15px",
            background: "#007bff",
            color: "#fff",
            borderRadius: 5,
            cursor: "pointer",
            textAlign: "center",
            width: 180,
          }}
        >
          {file ? file.name : "Choose File"}
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <button
          onClick={handleUpload}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            width: 180,
          }}
        >
          Upload
        </button>
      </div>

      {/* Table output */}
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Distribution Result</h3>
          <table
            border="1"
            cellPadding="8"
            style={{
              borderCollapse: "collapse",
              marginTop: 10,
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th>Agent</th>
                <th>Assigned Count</th>
              </tr>
            </thead>
            <tbody>
              {result.distributions &&
                result.distributions.map((d, idx) => (
                  <tr key={idx}>
                    <td>{d.agent}</td>
                    <td>{d.assignedCount}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <p style={{ marginTop: 10 }}>
            <strong>Total Records:</strong> {result.total}
          </p>
        </div>
      )}
    </div>
  );
}
