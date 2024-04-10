import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const R13CallingPool = ({ selectedCategory }) => {
  const [candidates, setCandidates] = useState([]);
  const [commentState, setCommentState] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null); // New state to store PDF URL
  const [showPdf, setShowPdf] = useState(false);
  const [showModal, setShowModal] = useState(false);



  // Function to fetch resume data by candidate id
  const fetchResume = async (candidateId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/candidates/resume/${candidateId}`,
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };
  

  const hidePdf = () => {
    setPdfUrl(null);
    setShowPdf(false);
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/candidates/callingpoollist/${selectedCategory}`
        );
        const filteredCandidates = response.data.filter(
          (candidate) => candidate.AcceptedOrRejected !== "Accepted"
        );
        setCandidates(filteredCandidates);

        // Fetch comments for each candidate and update commentState
        const comments = {};
        filteredCandidates.forEach((candidate) => {
          comments[candidate._id] = candidate.Remark || ""; // Initialize with empty string if no comment exists
        });
        setCommentState(comments);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, [selectedCategory]);

  const handleSave = async (candidateId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/candidates/callingpoollist/${candidateId}`,
        {
          Remark: commentState[candidateId],
        }
      );
      alert("Comment has been saved!");
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleChange = (event, candidateId) => {
    setCommentState({
      ...commentState,
      [candidateId]: event.target.value,
    });
  };

  const handleAccept = async (candidateId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/candidates/callingpoollist/accepted/${candidateId}`,
        {
          AcceptedOrRejected: "Accepted",
        }
      );

      // Update the state to remove the accepted candidate
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate._id !== candidateId)
      );
      alert("Candidate is accepted");
    } catch (error) {
      console.error("Error accepting candidate:", error);
    }
  };

  const handleReject = async (candidateId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/candidates/callingpoollist/rejected/${candidateId}`,
        {
          AcceptedOrRejected: "Rejected",
        }
      );

      // Update the state to remove the rejected candidate
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate._id !== candidateId)
      );
      alert("Candidate is rejected");
    } catch (error) {
      console.error("Error rejecting candidate:", error);
    }
  };

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div className="header1">
          <h1 className="company-name">TheRecAI Calling Pool</h1>
        </div>
        <div className="header1">
          <button className="rec-btn2">
            <a href="R13.html">Back to R13</a>
          </button>
        </div>
      </div>

      <div className="header-calling">
        <h2>List of Candidates</h2>
      </div>

      <div className="calling-container">
        {candidates.map((candidate) => (
          <div
            className="item-box"
            key={candidate._id}
            style={{ width: "720px", marginLeft: "60px" }}
          >
            <div className="calling-image-container">
              <div
                className="item-box3"
                style={{
                  height: "170px",
                  width: "360px",
                  marginLeft: "-440px",
                  paddingLeft: "1px",
                }}
              >
                <div
                  style={{ height: "10px", width: "90px" }}
                  className="rec-btn"
                >
                  {candidate.companyName}
                </div>
                <div
                  style={{ height: "10px", width: "130px" }}
                  className="rec-btn"
                >
                  {candidate.role}
                </div>
                <div
                  style={{ height: "10px", width: "90px" }}
                  className="rec-btn"
                >
                  {candidate.skill}
                </div>
                <div
                  style={{ height: "10px", width: "130px" }}
                  className="rec-btn"
                >
                  {candidate.technology}
                </div>
                <div
                  style={{ height: "10px", width: "90px" }}
                  className="rec-btn"
                >
                  {candidate.experience}
                </div>
              </div>

              <div
                className="calling-name"
                style={{ marginLeft: "90px", marginRight: "60px" }}
              >
                <h3>{`${candidate.firstName} ${candidate.lastName}`}</h3>
                <h4>{candidate.role}</h4>
                <div className="linked-in">
                  <img src="/icons8-linkedin-48.png" alt="" />
                  <img src="/icons8-phone-50.png" alt="" height="46px" />
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "-110px" }}>
              <button
                style={{ marginRight: "3px" }}
                className="rec-btn"
                onClick={() => fetchResume(candidate._id)}
              >
                View Resume
              </button>
              <button
                style={{ marginRight: "3px" }}
                className="rec-btn"
                onClick={() => handleReject(candidate._id)}
              >
                Rejected
              </button>
              <button
                style={{ marginRight: "3px" }}
                className="rec-btn"
                onClick={() => handleAccept(candidate._id)}
              >
                Accepted
              </button>

              <button
                className="rec-btn"
                style={{ marginRight: "3px" }}
                onClick={() => handleSave(candidate._id)}
              >
                Save
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "15px",
                }}
              >
                <textarea
                  className="comment-box"
                  style={{ width: "400px", marginRight: "10px" }}
                  placeholder="Enter your comment here..."
                  value={commentState[candidate._id] || ""}
                  onChange={(event) => handleChange(event, candidate._id)}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
       
      </div>
      {showModal && (
      <div className="modal-overlay">
        <div className="modal">
          
          <iframe
            title="Resume"
            src={pdfUrl}
            style={{ width: "100%", height: "100%" }}
          />
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default R13CallingPool;
