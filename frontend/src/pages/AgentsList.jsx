import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

export default function AgentsList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/agents`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setAgents(res.data.agents || []);
      } catch (err) {
        console.error("Error loading agents", err);
      }
    }
    fetchAgents();
  }, []);

  return (
    <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>Agents List</h2>
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a._id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
