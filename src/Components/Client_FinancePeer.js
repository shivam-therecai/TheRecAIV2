import React, { useEffect, useState } from "react";
import axios from "axios";

const Client_FinanacePeer = ({ navigateToVacancy }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/candidates/",
          {
            params: {
              companyName: "FinancePeer",
              AcceptedOrRejected: "Accepted",
              roleStatus: "Active",
            },
          }
          
        );
        console.log(response)
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div className="header1">
          <h1 className="company-name">Client</h1>
        </div>
        <div className="header1">
          <button className="rec-btn2">
            <a href="index.html">Home</a>
          </button>

          <img src="/Financepeer_new_logo.png" height="50px" alt="Crux logo" />
        </div>
      </div>

      <div className="calling-container">
        {candidates.map((candidate) => (
          <a
            href="VacancyButton.html"
            className="item-box4"
            key={candidate._id}
          >
            <div className="calling-image-container">
              {/* Render company logo if available */}
            </div>
            <div>
              <div style={{ textAlign: "left" }}>
                <ul>
                  <li>
                    <h4>
                      Role Name:{" "}
                      <span style={{ color: "brown" }}>{candidate.role}</span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Skills:{" "}
                      <span style={{ color: "brown" }}>{candidate.skill}</span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Experience:{" "}
                      <span style={{ color: "brown" }}>
                        {candidate.experience}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Technology:{" "}
                      <span style={{ color: "brown" }}>
                        {candidate.technology}
                      </span>{" "}
                    </h4>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Client_FinanacePeer;
