import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

export default function AddAgent() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/agents/add`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMessage("✅ Agent added successfully!");
      setForm({ name: "", email: "", mobile: "", password: "" });
    } catch (err) {
      console.error("AddAgent Error:", err.response?.data);
      setMessage(err.response?.data?.message || "❌ Failed to add agent");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
      <h2>Add Agent</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
  <input type="text" style={{ display: "none" }} /> {/* prevent autofill */}
  <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ width: "100%", marginBottom: 10 }} />
  <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: "100%", marginBottom: 10 }} autoComplete="off" />
  <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required style={{ width: "100%", marginBottom: 10 }} autoComplete="off" />
  <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ width: "100%", marginBottom: 10 }} autoComplete="new-password" />
  <button type="submit" style={{ width: "100%", padding: 10, background: "#28a745", color: "white" }}>
    Add Agent
  </button>
</form>
    </div>
  );
}
