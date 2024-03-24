import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const R11 = () => {
  // const [R_11, setR_11]=useState(false)
  const [validationData, setValidationData] = useState([]);

  const [R11, setR11] = useState({
    companyName: "",
    role: "",
    technology: "",
    skill: "",
    location: "",
    ctc: "",
    minExp: "",
    maxExp: "",
    maxNoticePeriod: "",
    remoteOrHybrid: "",
    workingDays: "",
  });

  useEffect(() => {
    // Function to fetch account data from MongoDB
    const fetchAccountNames = async () => {
      try {
        // Make a GET request to your backend server to fetch account data
        const response = await axios.get("http://localhost:4000/api/accounts");
        console.log(response); // Adjust the endpoint URL as needed

        // Extract account names from the response data
        const names = response.data;
        console.log(names);

        // Set the accountNames state with the extracted names
        setValidationData(names);
      } catch (error) {
        console.error("Error fetching account names:", error);
      }
    };

    // Call the fetchAccountNames function when the component mounts
    fetchAccountNames();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/R11Info", R11);
      console.log("R11 data submitted successfully");
      console.log(R11);
    } catch (err) {
      console.log("Error submitting R11 data", err);
    }
  };

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
          <button class="rec-btn2">
            <a href="index.html">Home</a>
          </button>
          <button class="rec-btn2">
            <a href="R12.html">Go to R12</a>
          </button>
        </div>
      </div>

      <div class="title">Role Variables</div>
      <div class="container2">
        <div class="form-container">
          <select
            id="Box1"
            name="compName"
            class="text-box"
            placeholder="Dropdown Input 1"
          >
            <option disabled selected>
              Company name
            </option>
            {console.log(validationData)}
            {/* Map over the accountNames array to populate dropdown options */}
            {validationData.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <input type="text" class="text-box" placeholder="Direct Input 1" />
          <button class="rec-btn">Raise Request</button>
        </div>

        <div class="form-container">
          <select
            name="roleName"
            class="text-box"
            placeholder="Dropdown Input 2"
          >
            <option disabled selected>
              Role name
            </option>
            <option>Digital Marketing</option>
            <option>Front End Developer</option>
            <option>Data Analyst</option>
            <option>Area Sales Manager</option>
          </select>
          <input type="text" class="text-box" placeholder="Direct Input 1" />
          <button className="rec-btn">Raise Request</button>
        </div>

        <div class="form-container">
          <select
            name="technology"
            className="text-box"
            placeholder="Dropdown Input 3"
          >
            <option disabled selected>
              Technology
            </option>
            <option>Java</option>
            <option>SEO</option>
            <option>Tableau</option>
            <option>Salesforce</option>
          </select>
          <input type="text" class="text-box" placeholder="Direct Input 1" />
          <button class="rec-btn">Raise Request</button>
        </div>

        <div class="form-container">
          <select name="skill" class="text-box" placeholder="Dropdown Input 4">
            <option disabled selected>
              Skill
            </option>
            <option>Coding</option>
            <option>Dashboarding</option>
            <option>Branding</option>
            <option>Sales</option>
          </select>
          <input type="text" class="text-box" placeholder="Direct Input 1" />
          <button class="rec-btn">Raise Request</button>
        </div>

        <div class="form-container">
          <select
            name="location"
            class="text-box"
            placeholder="Dropdown Input 5"
          >
            <option disabled selected>
              Location
            </option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Nashik</option>
            <option>Goa</option>
          </select>
          <input type="text" class="text-box" placeholder="Direct Input 1" />
          <button class="rec-btn">Raise Request</button>
        </div>
        <div class="form-container"></div>
      </div>

      <div class="title">Role Details</div>
      <div class="container3">
        <div class="form-container2">
          <input
            type="number"
            class="text-box"
            placeholder="Enter CTC in INR"
          />
          <input type="text" class="text-box" placeholder="Min Exp" />
        </div>
        <div class="form-container2">
          <input type="text" class="text-box" placeholder="Max Exp" />
          <input
            type="text"
            class="text-box"
            placeholder="Max Notice Period in Days"
          />
        </div>
        <div class="form-container2">
          <input type="text" class="text-box" placeholder="Remote/ Hybrid" />
          <input
            type="text"
            class="text-box"
            placeholder="No of Working Days"
          />
        </div>
      </div>

      <div class="form-container3">
        <button class="rec-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <script src="./src/app.js"></script>
    </div>
  );
};

export default R11;
