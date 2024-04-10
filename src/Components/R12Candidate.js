import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const R12Candidate = ({ selectedR12Name,navigateToR12HomePage }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/candidates/R12Candidate",
          {
            params: {
              selectedR12Name: selectedR12Name
            }
          }
        );
        // Filter candidates based on the selected R12 name
        const filteredCandidates = response.data.filter(
          (candidate) => candidate.r12Name === selectedR12Name
        );
        setCandidates(filteredCandidates);
        console.log(selectedR12Name);
        console.log(response);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
  
    fetchCandidates();
  }, [selectedR12Name]);
  

  return (
    <div>
      <div className="form-container1">
        <div class="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div class="header1">
          <h1 class="company-name">TheRecAI Calling Pool</h1>
        </div>
        <div class="header1">
          <button class="rec-btn2" onClick={navigateToR12HomePage}>
            R12HomePage
          </button>
          
        </div>
      </div>

      <div className="header-calling">
        <h2>List of Candidates</h2>
      </div>

      <div className="calling-container">


        {candidates.map((candidate,index)=>(
          <div className="item-box-container2" style={{ display: "flex" }}>
          <div
            class="item-box3"
            style={{
              height: "170px",
              width: "400px",
              marginLeft: "-210px",
              marginRight: "120px",
            }}
          >
            <div style={{ height: "10px", width: "90px" }} className="rec-btn">
              {candidate.companyName}
            </div>
            <div style={{ height: "10px", width: "90px" }} className="rec-btn">
              {candidate.role}
            </div>
            <div style={{ height: "10px", width: "90px" }} className="rec-btn">
              {candidate.skill}
            </div>
            <div style={{ height: "10px", width: "90px" }} className="rec-btn">
              {candidate.technology}
            </div>
            <div style={{ height: "10px", width: "90px" }} className="rec-btn">
              {candidate.experience}
            </div>
          </div>
          <div
            className="item-box7"
            style={{
              marginTop: "3px",
              width: "calc(100% - 210px)",
              height: "165px",
            }}
          >
            <div className="calling-image-container">
              <div className="calling-name">
                <h3>{candidate.firstName} {candidate.lastName}</h3>
                <h4>{candidate.role}</h4>

                <div className="linked-in">
                  <img src="/icons8-linkedin-48.png" alt="" />
                  <img src="/icons8-phone-50.png" alt="" height="46px" />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "-12px" }}>
              <button style={{ marginLeft: "-20px" }} class="rec-btn">
                View Resume{" "}
              </button>
              <button class="rec-btn">Rejected </button>
              <button class="rec-btn">Accepted </button>
              <button class="rec-btn">Save </button>
              <textarea
                class="comment-box"
                placeholder="Enter your comment here..."
                style={{ marginRight: "7px", padding: "0.5px", height: "55px" }}
              ></textarea>
            </div>
          </div>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default R12Candidate;
