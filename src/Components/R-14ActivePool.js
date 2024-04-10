import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const R14ActivePool = ({
  navigateToClient,
  selectedR14Name,
  navigateToFinancePeer,
}) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/candidates/5",
          {
            params: {
              AcceptedOrRejected: "Accepted",
              R14Name: selectedR14Name,
            },
          }
        );
        console.log(selectedR14Name);
        const filteredCandidates = response.data;
        console.log(filteredCandidates);
        setCandidates(filteredCandidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, [selectedR14Name]);
  console.log(selectedR14Name)
  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div className="header1">
          <h1 class="company-name">TheRecAI Active Pool</h1>
        </div>
        <div className="header1">
          <button className="rec-btn2">
            <a href="index.html">Home</a>
          </button>
          <button className="rec-btn2">
            <a href="R14.html">R14</a>
          </button>
        </div>
      </div>

      <div className="header-calling">
        <h2>List of Candidates</h2>
      </div>

      <div className="calling-container">
        {candidates.map((candidate) => (
          <div className="item-box1">
            <div
              className="item-box3"
              style={{ marginRight: "5px", width: "450px" }}
            >
              <button className="rec-btn">{candidate.companyName}</button>
              <button className="rec-btn">{candidate.role}</button>
              <button className="rec-btn">{candidate.skill}</button>
              <button className="rec-btn">{candidate.technology}</button>
              <button className="rec-btn">{candidate.experience}</button>
            </div>

            <div
              className="item-box"
              style={{ width: "600px", marginRight: "5px", marginLeft: "5px" }}
            >
              <div className="calling-image-container">
                <div className="calling-name">
                  <h3>{`${candidate.firstName} ${candidate.lastName}`}</h3>
                  <h4>{candidate.role}</h4>

                  <div className="linked-in">
                    <img src="/icons8-linkedin-48.png" alt="" />
                    <img src="/icons8-phone-50.png" alt="" height="46px" />
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="rec-btn"
                  style={{ marginLeft: "-98px", marginRight: "25px" }}
                >
                  View Resume{" "}
                </button>

                <textarea
                  style={{ marginRight: "-15px" }}
                  className="comment-box"
                  placeholder="Enter your comment here..."
                ></textarea>
              </div>
            </div>

            <div className="item-box2">
              <div className="stage-btn-con">
                <div>
                  <select
                    id="Box1"
                    className="text-box "
                    style={{
                      margin: "0 auto",
                      width: "90px",
                      marginLeft: "5px",
                    }}
                  >
                    <option disabled selected>
                      Stages
                    </option>
                    <option>Shared</option>
                    <option>Interviewed</option>
                    <option>Rejected</option>
                    <option>Backout</option>
                    <option>Selected</option>
                    <option>Joined</option>
                  </select>
                </div>
                <div>
                  <button className="rec-btn">Save</button>
                </div>
                <div>
                  <button classnmae="rec-btn" onClick={navigateToClient}>
                    Submit
                  </button>
                </div>
              </div>

              <div>
                <textarea
                  className="comment-box"
                  placeholder="Enter your comment here ..."
                  // style="margin: 10px; height: 110px;"
                  style={{
                    margin: "10px",
                    height: "110px",
                    width: "180px",
                    marginLeft: "20px",
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default R14ActivePool;
