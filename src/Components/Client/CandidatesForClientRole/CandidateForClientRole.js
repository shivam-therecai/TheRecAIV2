import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateForClientRole = ({ candidate,navigateToClient }) => {
  const [remarks, setRemarks] = useState({});
  const [R14Remarks, setR14Remarks] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null); // New state to store PDF URL
  const [showPdf, setShowPdf] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clientsComment, setClientsComment] = useState({});

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const remarksData = {};
        for (const cand of candidate) {
          const response = await axios.get(
            `http://localhost:4000/api/candidates/${cand._id}/remarks`
          );
          remarksData[cand._id] = response.data.remark;
        }
        setRemarks(remarksData);
      } catch (error) {
        console.error("Error fetching remarks:", error);
      }
    };

    fetchRemarks();
  }, [candidate]);

  useEffect(() => {
    const fetchR14Remarks = async () => {
      try {
        const remarksData = {};
        for (const cand of candidate) {
          const response = await axios.get(
            `http://localhost:4000/api/candidates/${cand._id}/2`
          );
          remarksData[cand._id] = response.data.R14Remark;
        }
        console.log(R14Remarks);
        setR14Remarks(remarksData);
      } catch (error) {
        console.error("Error fetching R14 remarks:", error);
      }
    };

    fetchR14Remarks();
  }, [candidate]);

  useEffect(() => {
    const fetchClientsComments = async () => {
      try {
        const clientsCommentData = {};
        for (const cand of candidate) {
          const response = await axios.get(
            `http://localhost:4000/api/candidates/${cand._id}/8`
          );
          clientsCommentData[cand._id] = response.data.ClientsComment;
        }
        setClientsComment(clientsCommentData);
      } catch (error) {
        console.error("Error fetching client's comments:", error);
      }
    };

    if (candidate) {
      fetchClientsComments();
    }
  }, [candidate]);

  const handleSaveComments = async (candId, comment) => {
    try {
      await axios.put(`http://localhost:4000/api/candidates/${candId}/1`, {
        R14Remark: comment,
      });
      // Update local state with the new comment
      setR14Remarks((prevRemarks) => ({
        ...prevRemarks,
        [candId]: comment,
      }));
      alert("R14 Comment has been saved");
    } catch (error) {
      console.error("Error saving comments:", error);
    }
  };
  const handleAccept = async (candId) => {
    try {
      await axios.put(`http://localhost:4000/api/candidates/${candId}/5`, {
        R14AcceptedOrRejected: "Accepted",
      });
      // Update the state to remove the accepted candidate
      setCandidates((prevCandidates) =>
        prevCandidates.filter((cand) => cand._id !== candId)
      );
      alert("Candidate is accepted");
    } catch (error) {
      console.error("Error accepting candidate:", error);
    }
  };

  const handleReject = async (candId) => {
    try {
      await axios.put(`http://localhost:4000/api/candidates/${candId}/6`, {
        R14AcceptedOrRejected: "Rejected",
      });
      // Update the state to remove the rejected candidate
      setCandidates((prevCandidates) =>
        prevCandidates.filter((cand) => cand._id !== candId)
      );
      alert("candidate is rejected");
    } catch (error) {
      console.error("Error rejecting candidate:", error);
    }
  };

  useEffect(() => {
    if (candidate) {
      const filtered = candidate.filter(
        (cand) => cand.R14AcceptedOrRejected === ""
      );
      setCandidates(filtered);
    }
  }, [candidate]);

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

  const handleClientComment = async (candId) => {
    try {
      await axios.put(`http://localhost:4000/api/candidates/${candId}/7`, {
        ClientsComment: clientsComment[candId],
      });
      alert("Client's comment has been saved");
    } catch (error) {
      console.error("Error saving client's comment:", error);
    }
  };

  if (!candidates) {
    return <div>Fetching...</div>; // Or any other placeholder or loading indicator
  }

  console.log(candidate);
  return (
    <div>
      <div class="form-container1">
        <div class="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div class="header1">
          <h1 class="company-name">TheRecAI</h1>
        </div>
        <div class="header1">
          <button class="rec-btn2" onClick={navigateToClient}>
            Client Page
          </button>
          <button class="rec-btn2">
            <a href="R14.html">R14</a>
          </button>
        </div>
      </div>

      <div class="header-calling">
        <h2>List of Candidates</h2>
      </div>

      <div class="calling-container">
        {candidates
          .filter((cand) => cand.R14AcceptedOrRejected === "")
          .map((cand) => (
            <div class="item-box1">
              <div class="item-box6">
                <div class="calling-image-container">
                  <div class="calling-name">
                    <h3>
                      {cand.firstName} {cand.lastName}
                    </h3>
                    <h4>{cand.role}</h4>

                    <div class="linked-in">
                      <img src="/icons8-linkedin-48.png" alt="" />
                      <img src="/icons8-phone-50.png" alt="" height="46px" />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    class="rec-btn"
                    style={{ marginLeft: "-100px" }}
                    onClick={() => fetchResume(cand._id)}
                  >
                    View Resume
                  </button>

                  <textarea
                    class="comment-box"
                    placeholder="Enter your comment here..."
                    style={{ height: "100px", width: "95%" }}
                    value={remarks[cand._id] || ""}
                    readOnly
                  ></textarea>
                </div>
              </div>

              <div class="item-box5">
                <div class="stage-btn-con">
                  <div>
                    <select
                      id="Box1"
                      class="text-box "
                      style={{ margin: "0 auto", width: "128px" }}
                    >
                      <option disabled selected>
                        Select
                      </option>
                      <option>Shared</option>
                      <option>Interviewed</option>
                      <option>Rejected</option>
                      <option>Backout</option>
                      <option>Selected</option>
                      <option>Joined</option>
                      <option>Stages</option>
                    </select>
                  </div>
                  <div>
                    <button
                      class="rec-btn"
                      onClick={() =>
                        handleSaveComments(cand._id, R14Remarks[cand._id])
                      }
                    >
                      Save Comments
                    </button>
                  </div>
                  <div>
                    <button
                      class="rec-btn"
                      onClick={() => handleReject(cand._id)}
                    >
                      Rejected
                    </button>
                  </div>
                  <div>
                    <button
                      class="rec-btn"
                      onClick={() => handleAccept(cand._id)}
                    >
                      Accepted
                    </button>
                  </div>
                </div>

                <div>
                  <textarea
                    class="comment-box"
                    placeholder="Enter your comment here ..."
                    style={{ margin: "10px", height: "130px", width: "200px" }}
                    value={R14Remarks[cand._id] || ""}
                    onChange={(e) =>
                      setR14Remarks({
                        ...R14Remarks,
                        [cand._id]: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div class="item-box5">
                <div>
                  <textarea
                    className="comment-box"
                    placeholder="Enter your comment here ..."
                    style={{ margin: "10px", height: "110px", width: "300px" }}
                    value={clientsComment[cand._id] || ""}
                    onChange={(e) =>
                      setClientsComment({
                        ...clientsComment,
                        [cand._id]: e.target.value,
                      })
                    }
                  ></textarea>
                  <button
                    className="rec-btn"
                    style={{
                      marginBottom: "5px",
                      padding: "10px",
                      marginLeft: "-50px",
                      marginTop: "3px",
                    }}
                    onClick={() =>
                      handleClientComment(
                        cand._id,
                        clientsComment[cand._id] || ""
                      )
                    }
                  >
                    Client's Comment
                  </button>
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

export default CandidateForClientRole;
