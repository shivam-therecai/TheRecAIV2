import React, { useEffect, useState } from "react";
import axios from "axios";
import CandidateForClientRole from "./CandidatesForClientRole/CandidateForClientRole";
import "./styles.css";

const ClientPageTemplate = ({ accountName, navigateToCandidateForClientRole }) => {
  const [roles, setRoles] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Fetch roles with roleStatus 'open'
        const responseOpen = await axios.get(
          "http://localhost:4000/api/R11Info/3",
          {
            params: {
              companyName: accountName, // Use accountName dynamically
              roleStatus: "open",
            },
          }
        );
        console.log(accountName)
        
 
        // Fetch roles with roleStatus 'Active'
        const responseActive = await axios.get(
          "http://localhost:4000/api/R11Info/3",
          {
            params: {
              companyName: accountName, // Use accountName dynamically
              roleStatus: "Active",
            },
          }
        );

        // Merge the results of both responses
        const combinedRoles = [...responseOpen.data, ...responseActive.data];
        // const combinedRoles = [...responseOpen.data];
        setRoles(combinedRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, [accountName]); // Include accountName in dependency array

  const handleBoxClick = async (role) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/candidates/1",
        {
          params: {
            companyName: accountName, // Use accountName dynamically
            AcceptedOrRejected: "Accepted",
          },
        }
      );

      const matchedCandidates = response.data.filter((candidate) => {
        // Trim and convert both candidate's role and provided role to lowercase
        const candidateRole = candidate.role.trim().toLowerCase();
        const providedRole = role.role.trim().toLowerCase();
        return candidateRole === providedRole;
      });

      setSelectedCandidate(matchedCandidates);
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
          <h1 className="company-name">{accountName}</h1> {/* Use accountName dynamically */}
        </div>
        <div className="header1">
          <img src={`/${accountName.replace(/\s+/g, '')}.png`} alt={accountName} height="60px" /> {/* Use accountName dynamically */}
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
            style={{ cursor: "pointer" }}
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
                    <h4> Location: {role.location}</h4>
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

export default ClientPageTemplate;
