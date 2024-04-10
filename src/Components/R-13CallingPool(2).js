import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const R13CallingPool = ({ selectedCategory }) => {
  const [candidates, setCandidates] = useState([]);
  const [editedComment, setEditedComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [candidateIdEditing, setCandidateIdEditing] = useState("");
  console.log(selectedCategory);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/candidates/callingpoollist/${selectedCategory}`
        );
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, [selectedCategory]);

  const handleSave = async (candidateId) => {
    try {
      await axios.put(`http://localhost:4000/api/candidates/callingpoollist/${selectedCategory}`, {
        Remark: editedComment
      });
      setIsEditing(false);
      setEditedComment("");
      // Refetch candidates to update the UI
      // fetchCandidates();
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleChange = (event) => {
    setEditedComment(event.target.value);
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
          <div className="item-box" key={candidate._id}>
            <div className="calling-image-container">
              <div className="image-calling">
                {/* Replace with candidate image */}
                <img src="/4974985.png" alt="" height="130px" />
              </div>
              <div className="calling-name">
                <h3>{`${candidate.firstName} ${candidate.lastName}`}</h3>
                <h4>{candidate.role}</h4>
                <div className="linked-in">
                  {/* Add LinkedIn and phone icons */}
                  <img src="/icons8-linkedin-48.png" alt="" />
                  <img src="/icons8-phone-50.png" alt="" height="46px" />
                </div>
              </div>
            </div>
            <div >
              <div style={{ marginLeft: '2px' }}>
              <button style={{marginRight:"3px"}} className="rec-btn">View Resume</button>
              <button style={{marginRight:"3px"}} className="rec-btn">Rejected</button>
              <button style={{marginRight:"3px"}} className="rec-btn">Accepted</button>
              <button style={{marginRight:"3px"}} className="rec-btn">Edit</button>
              </div>
              <textarea 
                className="comment-box"
                placeholder="Enter your comment here..."
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default R13CallingPool;




