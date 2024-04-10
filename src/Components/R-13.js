import React, { useState } from "react";
import "./styles.css";

// import navigateToR13CallingPool from './../App'
const R13 = ({ navigateToR13CandidatePool, navigateToR13CallingPool }) => {
  const [selectedOption, setSelectedOption] = useState(""); // State to hold the selected option

  // Function to navigate to R13 Calling Pool with the selected option
  const handleNavigateToR13CallingPool = () => {
    if (selectedOption) {
      // Check if an option is selected
      navigateToR13CallingPool(selectedOption); // Pass the selected option to the navigation function
    } else {
      // If no option is selected, handle accordingly (e.g., show an error message)
      alert("Please select an option before navigating.");
      console.error("Please select an option before navigating.");
    }
  };

  return (
    <div>
      <div class="form-container1">
        <div class="header1">
          <img src="/logo.png" alt="Logo" height="60px" />
        </div>
        <div class="header1">
          <h1 class="company-name">TheRecAI</h1>
        </div>
        <div class="header1">
          <button class="rec-btn2">
            <a href="R12.html">Go back to R12</a>
          </button>
        </div>
      </div>
      <div>
        <h1>R13</h1>
        <h1>Profile Page</h1>
      </div>

      <div class="r13-btn-container">
        <button class="rec-btn" onClick={navigateToR13CandidatePool}>
          Go to Candidate Pool
        </button>
        <button className="rec-btn" onClick={handleNavigateToR13CallingPool}>
          Go to Calling Pool
        </button>
        <select
          className="rec-btn"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="Chandani">Chandani</option>
          <option value="Silfa">Silfa</option>
          <option value="Namrata">Namrata</option>
          <option value="Pradnya">Pradnya</option>
        </select>
      </div>

      <div class="profile-container">
        <div class="profile">
          <img
            src="/4974985.png"
            alt="ProfilePicture"
            style={{ height: "150px" }}
          />
          <h2>John Doe</h2>
          <p>Age: 30</p>
          <p>Occupation: Software Engineer</p>
          <p>
            Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default R13;
