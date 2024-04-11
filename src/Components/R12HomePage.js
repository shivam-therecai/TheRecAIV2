import React, {useState} from "react";

const R12HomePage = ({ navigateToR12AddCandidate, navigateToR12Candidate,navigateToR12UploadCsv }) => {

  const [selectedR12Name, setSelectedR12Name] = useState("");

  const handleDropdownChange = (event) => {
    console.log(selectedR12Name);
    setSelectedR12Name(event.target.value);
  };
  const navigateToCandidatePool = () => {
    if (selectedR12Name) {
      navigateToR12Candidate(selectedR12Name);
    } else {
      alert('please select a R12Name')
      console.error("Please select an R12 name from the dropdown.");
    }
  };

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="60px" />
        </div>
        <div className="header1">
          <h1 className="company-name">TheRecAI</h1>
        </div>
        <div className="header1">
          <button className="rec-btn2">
           
            <a href="index.html">Home</a>
          </button>
        </div>
      </div>
      <div>
        <h1>R12 Home Page</h1>
      </div>

      <div className="r13-btn-container">
        <button
          className="rec-btn"
          onClick={navigateToR12UploadCsv}
         
        > Upload CSV</button>
        <button
          className="rec-btn"
          onClick={navigateToR12AddCandidate}
         
        > Add
        Candidate</button>
        <button
          className="rec-btn"
          onClick={navigateToCandidatePool}
          
        >Candidate
        Pool</button>
        <div>
          <select id="Box1" className="text-box" value={selectedR12Name} onChange={handleDropdownChange}>
            <option disabled selected value="">
              Assign
            </option>
            <option value="Chandani">Chandani</option>
            <option value="Pradnya">Pradnya</option>
            <option value="Namrata">Namrata</option>
            <option value="Silfa">Silfa</option>
          </select>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile">
          <img src="profile_picture.jpg" alt="ProfilePicture" />
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

export default R12HomePage;
