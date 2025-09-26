import React from "react";
import { getUser, removeToken, removeUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import AddAgent from "../components/AddAgent";
import UploadPage from "../components/UploadPage";
import AgentsList from "./AgentsList";

export default function Dashboard() {
  const navigate = useNavigate();
  const userInfo = getUser();

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      {/* Welcome message centered */}
      {userInfo && (
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          Welcome, <strong>{userInfo.name}</strong>!
        </h2>
      )}

      {/* Two-column area: left=AddAgent right=Upload */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 8,
            boxShadow: "0 0 6px rgba(0,0,0,0.06)",
          }}
        >
          <AddAgent />
        </div>

        <div
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 8,
            boxShadow: "0 0 6px rgba(0,0,0,0.06)",
          }}
        >
          <UploadPage />
        </div>
      </div>

      {/* Agents list below */}
      <div
        style={{
          marginTop: 30,
          background: "#fff",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <AgentsList />
      </div>

      {/* Logout button at the bottom */}
      <div style={{ marginTop: "auto", textAlign: "center" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            marginTop: 20,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
