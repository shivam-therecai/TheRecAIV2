import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

const R11OpenARole = ({ navigateToR11HomePage }) => {
  // const [R_11, setR_11]=useState(false)
  const [validationData, setValidationData] = useState([]);
  const [validationData1, setValidationData1] = useState([]);
  const [roleStatus, setRoleStatus] = useState('');

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

  //for fetching the company name
  useEffect(() => {
    const fetchAccountsData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/accounts");
        console.log(response);

        const names = response.data;
        console.log(names);

        setValidationData(names);
      } catch (error) {
        console.error("Error fetching account names:", error);
      }
    };

    fetchAccountsData();
  }, []);

  //for fetching the role, technology,skill, location
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/standard/StandardizedCollection"
        );
        setValidationData1(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  // for handling dropdown chnage
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setR11((prevR11) => ({
      ...prevR11,
      [name]: value,
    }));
  };

  //for handling input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setR11((prevR11) => ({
      ...prevR11,
      [name]: value,
    }));
  };

  //for handling submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get current date in Indian Standard Time (IST)
      const currentDate = new Date();
      console.log(currentDate);  //Mon Apr 01 2024 13:37:40 GMT+0530 (India Standard Time)

    //   Format the date as dd-mm-yyyy using toLocaleString with options
      const formattedDate = currentDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      console.log(formattedDate);  //01/04/2024
      // console.log(formattedDate); // Output: "15-03-2024" (for example)
      setRoleStatus('open');
      // const currentDate = new Date().toISOString();
      const recruiter = {
        name: "John Doe",
        role: "Recruiter",
      };
      const dataToSend = { ...R11, StartingDate: formattedDate, recruiter,roleStatus:'open' };
      await axios.post("http://localhost:4000/api/R11Info", dataToSend);
      alert("Roles collection data submitted successfully");
      setR11({
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
        
      }); // Resetting the state after submission
      setRoleStatus('');
      console.log("Roles collection data submitted successfully");
      console.log(dataToSend);
    } catch (err) {
      console.log("Error submitting Roles collection data", err);
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
          <button
            class="rec-btn2"
            onClick={navigateToR11HomePage}
            
          >R11HomePage</button>
          {/* <button class="rec-btn2">
            <a href="R12.html">Go to R12</a>
          </button> */}
        </div>
      </div>

      <div class="title">Role Variables</div>
      <div class="container2">
        <div class="form-container">
          <select
            id="Box1"
            name="companyName"
            class="text-box"
            placeholder="Dropdown Input 1"
            value={R11.companyName}
            onChange={handleDropdownChange}
          >
            <option disabled value="">
              Select Company name
            </option>
            {console.log(validationData)}

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
            name="role"
            class="text-box"
            placeholder="Dropdown Input 2"
            value={R11.role}
            onChange={handleDropdownChange}
          >
            <option disabled value="">
              Select Role
            </option>

            {validationData1.map((item, index) => (
              <option key={index} value={item.role}>
                {item.role}
              </option>
            ))}
          </select>
          <input type="text" class="text-box" placeholder="Direct Input 1" />
          <button className="rec-btn">Raise Request</button>
        </div>

        <div class="form-container">
          <select
            name="technology"
            className="text-box"
            placeholder="Dropdown Input 3"
            value={R11.technology}
            onChange={handleDropdownChange}
          >
            <option disabled value="">
              Select Technology
            </option>
            {validationData1.map((item, index) => (
              <option key={index} value={item.technology}>
                {item.technology}
              </option>
            ))}
          </select>
          <input type="text" class="text-box" placeholder="Direct Input 1" />
          <button class="rec-btn">Raise Request</button>
        </div>

        <div class="form-container">
          <select
            name="skill"
            class="text-box"
            placeholder="Dropdown Input 4"
            value={R11.skill}
            onChange={handleDropdownChange}
          >
            <option disabled value="">
              Skill
            </option>
            {validationData1.map((item, index) => (
              <option key={index} value={item.skill}>
                {item.skill}
              </option>
            ))}
          </select>
          <input type="text" class="text-box" placeholder="Direct Input 1" />
          <button class="rec-btn">Raise Request</button>
        </div>

        <div class="form-container">
          <select
            name="location"
            class="text-box"
            placeholder="Dropdown Input 5"
            value={R11.location}
            onChange={handleDropdownChange}
          >
            <option disabled value="">
              Location
            </option>
            {validationData1.map((item, index) => (
              <option key={index} value={item.location}>
                {item.location}
              </option>
            ))}
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
            name="ctc"
            value={R11.ctc}
            onChange={handleInputChange}
          />
          <input
            type="text"
            class="text-box"
            placeholder="Min Exp"
            name="minExp"
            value={R11.minExp}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-container2">
          <input
            type="text"
            class="text-box"
            placeholder="Max Exp"
            name="maxExp"
            value={R11.maxExp}
            onChange={handleInputChange}
          />
          <input
            type="text"
            class="text-box"
            placeholder="Max Notice Period in Days"
            name="maxNoticePeriod"
            value={R11.maxNoticePeriod}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-container2">
          <input
            type="text"
            class="text-box"
            placeholder="Remote/ Hybrid"
            name="remoteOrHybrid"
            value={R11.remoteOrHybrid}
            onChange={handleInputChange}
          />
          <input
            type="text"
            class="text-box"
            placeholder="No of Working Days"
            name="workingDays"
            value={R11.workingDays}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div class="form-container3">
        <button class="rec-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default R11OpenARole;
