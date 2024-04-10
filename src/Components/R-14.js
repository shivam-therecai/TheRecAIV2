import React, { useState } from "react";

const R14 = ({ navigateToR14CandidatePool, navigateToR14ActivePool }) => {
  const [selectedR14Name, setSelectedR14Name] = useState(""); // State to hold the selected option

  // Function to navigate to R14 Active Pool with the selected option
  const handleNavigateToR14ActivePool = () => {
    if (selectedR14Name) {
      // Check if an option is selected
      navigateToR14ActivePool(selectedR14Name); // Pass the selected option to the navigation function
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
            {" "}
            <a href="index.html">Home</a>{" "}
          </button>
          <button class="rec-btn2">
            <a href="R13.html">R13</a>
          </button>
        </div>
      </div>
      <div>
        <h1>R14</h1>
        <h1>Profile Page</h1>
      </div>
      <div class="r13-btn-container">
        <button class="rec-btn" onClick={navigateToR14CandidatePool}>
          Candidate Pool
        </button>
        <button class="rec-btn">
          <a href="R14ActivePool.html" onClick={handleNavigateToR14ActivePool}>
            Active Pool
          </a>
        </button>
        <div>
          <select
            id="Box1"
            class="text-box"
            value={selectedR14Name}
            onChange={(e) => setSelectedR14Name(e.target.value)}
          >
            <option value="">Select R14Name</option>
            <option value="Chandani">Chandani</option>
            <option value="Pradnya">Pradnya</option>
            <option value="Namrata">Namrata</option>
            <option value="Silfa">Silfa</option>
          </select>
        </div>
      </div>
      <div class="profile-container">
        <div class="profile">
          <img src="/4974985.png" alt="ProfilePicture" height="160px" />
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

export default R14;
