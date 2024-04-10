import React, { useState, useEffect } from "react";
import "./R-12.css";
import axios from "axios";

const R12 = () => {
  const [startDate, setStartDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [selectedObjectId, setSelectedObjectId] = useState("");
  const [ObjectIds, setObjectIds] = useState("");
  const [objectDetails, setObjectDetails] = useState({
    companyName: "",
    role: "",
    StartingDate: "",
    location: "",
    technology: "",
    skill: "",
  });
  const [candidateDetails, setCandidateDetails] = useState({
    roleCode: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    linkedinProfile: "",
    resume: null, // For file upload
    experience: "",
    sourceCode: "",
    sourcingCode: "",
    vendorCode: "",
    R12Name: "",
    R12Date: "",
    candidateCode: "",
    R13Name: "",
    R14Name: "",
    Remark: "",
  });
  const [submittedCandidates, setSubmittedCandidates] = useState([]);

  // Add state variables for other fields
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (startDate || companyName || roleName) {
          // console.log(startDate);

          const normalizedCompanyName = companyName.toLowerCase().trim();
          const normalizedRoleName = roleName.toLowerCase().trim();

          const formattedStartDate = new Date(startDate).toLocaleString(
            "en-IN",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );
          // console.log(formattedStartDate);

          // const response = await axios.get(
          //   `http://localhost:4000/api/R11Info?companyName=${normalizedCompanyName}&roleName=${normalizedRoleName}&startDate=${formattedStartDate}`
          // );
          const response = await axios.get(
            `http://localhost:4000/api/R11Info?companyName=${normalizedCompanyName}&roleName=${normalizedRoleName}&startDate=${formattedStartDate}`
          );
          // const response = await axios.get(
          //     `http://localhost:4000/api/R11Info?companyName=${normalizedCompanyName}&roleName=${normalizedRoleName}&startDate=${startDate}`
          // );

          // const filteredResponse = response.data.filter((entry) => {
          //   console.log(entry.StartingDate);
          //   // No need to convert to Date object
          //   return (
          //     entry.companyName.toLowerCase().trim() ===
          //       normalizedCompanyName &&
          //     entry.role.toLowerCase().trim() === normalizedRoleName
          //   );
          // });

          const filteredResponse = response.data.filter((entry) => {
            // Format entry.StartingDate to match the format of startDate
            const formattedEntryStartingDate = new Date(
              entry.StartingDate
            ).toLocaleString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });

            return (
              formattedEntryStartingDate === formattedStartDate &&
              entry.companyName.toLowerCase().trim() ===
                normalizedCompanyName &&
              entry.role.toLowerCase().trim() === normalizedRoleName
            );
          });

          const fetchedObjectIds = filteredResponse.map((entry) => entry._id);

          setObjectIds(fetchedObjectIds);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [companyName, roleName, startDate]); // Include startDate as a string in the dependency array

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    // console.log(selectedDate);
  };

  const handleObjectIDChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedObjectId(selectedId);
    // console.log(selectedId);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/R11Info/${selectedId}`
      );
      const details = response.data; // Assuming the response contains all the details
      console.log(details);
      setObjectDetails(details);
    } catch (error) {
      console.error("Error fetching object details:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "resume") {
      // Update candidateDetails with the selected file
      setCandidateDetails((prevDetails) => ({
        ...prevDetails,
        resume: files[0], // Store the File object
      }));
    } else {
      setCandidateDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    // Add the current candidate details to the list of submitted candidates
    setSubmittedCandidates((prevCandidates) => [
      ...prevCandidates,
      candidateDetails,
    ]);

    // Clear the form after submission
    setCandidateDetails({
      roleCode: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      linkedinProfile: "",
      resume: null,
      experience: "",
      sourceCode: "",
      sourcingCode: "",
      vendorCode: "",
      r12Name: "",
      r12Date: "",
    });
  };

  const handleSubmitAllProfiles = async () => {
    try {
      // Iterate through submittedCandidates and send each candidate's data to the backend API
      for (const candidate of submittedCandidates) {
        // Extract only the desired fields from objectDetails
        const { companyName, role, location, technology, skill, StartingDate } =
          objectDetails;

        // Combine selected fields from objectDetails with candidate details
        const combinedData = {
          companyName,
          role,
          location,
          technology,
          skill,
          StartingDate,
          resume: candidate.resume,
          ...candidate,
        };

        console.log(combinedData.resume);

        const response = await axios.post(
          "http://localhost:4000/api/candidates",
          combinedData
        );
        console.log("Candidate submitted:", response.data);
      }
      alert("All profiles submitted successfully");
      // Clear the submitted candidates list after successful submission
      setSubmittedCandidates([]);
      setObjectDetails({
        companyName: "",
        role: "",
        StartingDate: "",
        location: "",
        technology: "",
        skill: "",
      });
      setCompanyName("");
      setStartDate("");
      setRoleName("");
      setSelectedObjectId("");
    } catch (error) {
      console.error("Error submitting candidates:", error);
    }
  };

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          {/* Logo */}
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div
          className="header1"
          style={{
            textAlign: "center",
            marginright: "1000px",
            marginLeft: "20px",
            paddingLeft: "0",
          }}
        >
          {/* Company Name */}
          <h1 className="company-name">TheRecAI</h1>
        </div>
        <div class="header1">
          <button class="rec-btn2">
            {" "}
            <a href="index.html">Home</a>{" "}
          </button>
        </div>
      </div>
      <div class="title">Role Variables</div>
      <div style={{ display: "flex", marginLeft: "10%", paddingLeft: "10px" }}>
        <input
          type="date"
          class="custom-input"
          name="startDate"
          id=""
          placeholder="Enter Start Date"
          style={{ marginBottom: "5px" }}
          value={startDate}
          onChange={handleStartDateChange}
        ></input>
        <input
          placeholder="Enter company name"
          style={{
            width: "250px",
            height: "48px",
            borderRadius: "4px",
            marginBottom: "10px",
            marginLeft: "5px",
          }}
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
        ></input>
        <input
          placeholder="Enter role name"
          style={{
            width: "250px",
            height: "48px",
            borderRadius: "4px",
            marginBottom: "10px",
            marginLeft: "5px",
          }}
          value={roleName}
          onChange={(event) => setRoleName(event.target.value)}
        ></input>
      </div>
      <div style={{ paddingRight: "1000px" }}>
        <p>Enter Start Date</p>
      </div>
      <p style={{ paddingRight: "450px", marginBottom: "40px" }}>
        R12 will keep a list of start date for all relevant roles, this will
        help them identify their role quickly
      </p>
      <div style={{paddingLeft:'165px'}}>
      <select
        name="roleCode"
        id=""
        className="custom-input"
        onChange={handleObjectIDChange}
        value={selectedObjectId}
      >
        <option value="">Select an ID</option>
        {Array.isArray(ObjectIds) &&
          ObjectIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
      </select>
      </div>
      <p style={{ paddingRight:'350px', marginBottom: "50px" }}>
        Here, R12 will get all roles which have the same start date as the date
        selected. They have to select the right role code
      </p>
      <div class="title">Verify Values</div>
      <div class="form-container" style={{ marginBottom: "4px", paddingLeft:'10px', marginLeft:'10%' }}>
        <input
          type="text"
          class="text-box"
          placeholder="Company Name"
          value={objectDetails.companyName}
          readOnly
        />
        <input
          type="text"
          class="text-box"
          placeholder="Role Name"
          value={objectDetails.role}
          readOnly
        />
        <input
          type="text"
          class="text-box"
          placeholder="Date"
          value={objectDetails.StartingDate}
          readOnly
        />
        <input
          type="text"
          class="text-box"
          placeholder="Location"
          value={objectDetails.location}
          readOnly
        />
      </div>
      
      <div class="form-container" style={{ marginBottom: "4px", paddingLeft:'10px', marginLeft:'10%' }}>
        <input
          type="text"
          class="text-box"
          placeholder="Technology"
          value={objectDetails.technology}
          readOnly
        />
        <input
          type="text"
          class="text-box"
          placeholder="Skills"
          value={objectDetails.skill}
          readOnly
        />
      </div>
      <p style={{ textAlign: "left" }}>
        R12 will look at this information and make sure they have selected the
        right role, for which they want to submit profiles
      </p>
      {/* <div style={{ textAlign: "left", left: "100px" }}>
        <button className="rec-btn">Verify</button>
      </div>

      <p style={{ textAlign: "left", marginBottom: "60px" }}>
        Once this button is pressed, the role code is locked and data entered
        below will be sent with this particular role code attached to it
      </p> */}
      <div
        className="table-container"
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          marginBottom: "5px",
          paddingBottom: "10px",
        }}
      >
        <table class="abc">
          <tr>
            <th>Role Code</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th style={{ width: "180px" }}>Email</th>
            <th>Linkedin Profile</th>
            <th>Attach Resume</th>
            <th>Experience</th>
            <th>Source Code</th>
            <th>Sourcing Code (I/O)</th>
            <th>Vendor Code</th>
            <th>R12 Name</th>
            <th>R12 Date(Generated)</th>
            <th>Candidate Code (Generated)</th>
          </tr>

          <tr>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="roleCode"
                value={candidateDetails.roleCode}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="firstName"
                value={candidateDetails.firstName}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="lastName"
                value={candidateDetails.lastName}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="phoneNumber"
                value={candidateDetails.phoneNumber}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="email"
                value={candidateDetails.email}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="linkedinProfile"
                value={candidateDetails.linkedinProfile}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="file"
                className="custom-input"
                style={{ width: "150px" }}
                name="resume"
                // value={candidateDetails.resume}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="number"
                className="custom-input"
                style={{ width: "150px" }}
                name="experience"
                value={candidateDetails.experience}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="sourceCode"
                value={candidateDetails.sourceCode}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="sourcingCode"
                value={candidateDetails.sourcingCode}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="vendorCode"
                value={candidateDetails.vendorCode}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="r12Name"
                value={candidateDetails.r12Name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="date"
                className="custom-input"
                style={{ width: "150px" }}
                name="r12Date"
                value={candidateDetails.r12Date}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
                name="lastName"
                value={candidateDetails.candidateCode}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </table>
      </div>
      <button
        onClick={handleSubmit}
        class="rec-btn"
        style={{ marginTop: "5px", marginBottom: "27px", alignContent: "1px" }}
      >
        Submit
      </button>

      {/* multiple candidate tables */}
      <div
        className="table-container"
        style={{
          maxHeight: "2000px",
          overflowY: "auto",
          marginBottom: "5px",
          paddingBottom: "10px",
        }}
      >
        <table class="abc">
          <tr>
            <th style={{ width: "280px" }}>Role Code</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th style={{ width: "280px" }}>Email</th>
            <th style={{ width: "280px" }}>Linkedin Profile</th>
            <th>Attach Resume</th>
            <th>Experience</th>
            <th>Source Code</th>
            <th>Sourcing Code (I/O)</th>
            <th>Vendor Code</th>
            <th>R12 Name</th>
            <th>R12 Date(Generated)</th>
            <th>Candidate Code (Generated)</th>
          </tr>

          {submittedCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.roleCode}</td>
              <td>{candidate.firstName}</td>
              <td>{candidate.lastName}</td>
              <td>{candidate.phoneNumber}</td>
              <td>{candidate.email}</td>
              <td>{candidate.linkedinProfile}</td>
              <td>
                {candidate.resume
                  ? candidate.resume.name
                  : "No resume attached"}
              </td>{" "}
              {/* Render file name */}
              <td>{candidate.experience}</td>
              <td>{candidate.sourceCode}</td>
              <td>{candidate.sourcingCode}</td>
              <td>{candidate.vendorCode}</td>
              <td>{candidate.r12Name}</td>
              <td>{candidate.r12Date}</td>
              <td>{candidate.candidateCode}</td>
            </tr>
          ))}
        </table>
      </div>

      <button class="rec-btn" onClick={handleSubmitAllProfiles}>
        Submit All Profiles
      </button>
      <p>
        Whenever this button is pressed there will be an alert warning that they
        should verify all data once again. IN LATER VERSION WE WILL HAVE TO GIVE
        THEM AN OPTION TO ACCESS A PARTICULAR CANDIDATE AND UPDATE DATA IF THEY
        HAVE MADE A MISTAKE
      </p>
    </div>
  );
};

export default R12;
