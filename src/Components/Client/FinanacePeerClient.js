import React, { useEffect, useState } from "react";
import "./styles.css"; // Import CSS file for styling
import axios from "axios";

const FinanacePeerClient = ({navigateToCandidateForClientRole}) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/R11Info/3",
          {
            params: {
              companyName: "FinancePeer",
              roleStatus: "Active",
            },
          }
        );
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleBoxClick = async (role) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/candidates/1",
        {
          params: {
            companyName: "FinancePeer",
            AcceptedOrRejected: "Accepted",
          },
        }
      );
      console.log(response.role);
      console.log(response.data);
      console.log(role.role);

      const matchedCandidates = response.data.filter((candidate) => {
        // Trim and convert both candidate's role and provided role to lowercase
        const candidateRole = candidate.role.trim().toLowerCase();
        const providedRole = role.role.trim().toLowerCase();
        console.log(candidateRole); // Log the candidate role
        return candidateRole === providedRole;
      });

      console.log(matchedCandidates); // Log matched candidates

      console.log(matchedCandidates);
      // setSelectedCandidate(matchedCandidates);
      navigateToCandidateForClientRole(matchedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div className="header1">
          <h1 className="company-name">FinancePeer</h1>
        </div>
        <div className="header1">
          <img
            src="/Financepeer_new_logo.png"
            alt="financePeer"
            height="60px"
          />
        </div>
      </div>

      <div className="header-calling">
        <h2>Active Roles</h2>
      </div>

      <div className="calling-container1">
        {roles.map((role) => (
          <div
            className="item-box4"
            key={role._id}
            onClick={() => handleBoxClick(role)}
            style={{cursor:'pointer'}}
          >
            <div className="calling-image-container"></div>
            <div>
              <div className="vacancy-info" style={{ textAlign: "left" }}>
                <ul>
                  <li>
                    <h4>Role Name: {role.role}</h4>
                  </li>
                  <li>
                    <h4>Skills: {role.skill}</h4>
                  </li>
                  <li>
                    <h4>Experience: {role.experience}</h4>
                  </li>
                  <li>
                    <h4>Technology: {role.technology}</h4>
                  </li>
                  <li>
                    <h4>Starting Date: {role.StartingDate}</h4>
                  </li>
                  <li>
                    <h4>Location: {role.location}</h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanacePeerClient;
