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
    r12Name: "",
    r12Date: "",
  });

  // Combine candidate details form data with objectDetails
  const combinedData = {
    ...objectDetails,
    ...candidateDetails,
  };

  // Add state variables for other fields
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (startDate && companyName && roleName) {
          // Normalize user-entered company name and role name
          const normalizedCompanyName = companyName.toLowerCase().trim();
          const normalizedRoleName = roleName.toLowerCase().trim();

          const response = await axios.get(
            `http://localhost:4000/api/R11Info?startDate=${startDate}&companyName=${normalizedCompanyName}&roleName=${normalizedRoleName}`
          );

          // Filter the response based on normalized company name and role name
          const filteredResponse = response.data.filter((entry) => {
            const normalizedResponseCompanyName = entry.companyName
              .toLowerCase()
              .trim();
            const normalizedResponseRoleName = entry.role.toLowerCase().trim();
            return (
              normalizedResponseCompanyName === normalizedCompanyName &&
              normalizedResponseRoleName === normalizedRoleName
            );
          });

          // Extract relevant data from the filtered response
          const fetchedObjectIds = filteredResponse.map((entry) => entry._id);

          // Set the state with the extracted object IDs
          setObjectIds(fetchedObjectIds);
          console.log(ObjectIds);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate, companyName, roleName]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleObjectIDChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedObjectId(selectedId);
    console.log(selectedId);

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

  // Render options for dropdown
  // const renderOptions = () => {
  //   return ObjectIds.map((id) => (
  //     <option key={id} value={id}>
  //       {id}
  //     </option>
  //   ));
  // };

  // const handleVerify = () => {
  //   // Lock initial profile
  // };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setCandidateDetails((prevDetails) => ({
      ...prevDetails,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Send combined data to backend API
      const response = await axios.post(
        "http://localhost:4000/api/candidates",
        combinedData
      );
      alert('Candidate collection data submitted successfully')
      console.log("Candidate submitted:", response.data);
      // Optionally, show a success message or perform other actions after successful submission
    } catch (error) {
      console.error("Error submitting candidate:", error);
      // Handle error (e.g., show error message to user)
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
          }}
        >
          {/* Company Name */}
          <h1 className="company-name">TheRecAI</h1>
        </div>
      </div>
      <div class="title">Role Variables</div>
      <div style={{ display: "flex" }}>
        <input
          type="date"
          class="custom-input"
          name=""
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

      <p style={{ textAlign: "left" }}>Enter Start Date</p>
      <p style={{ textAlign: "left", marginBottom: "40px" }}>
        R12 will keep a list of start date for all relevant roles, this will
        help them identify their role quickly
      </p>
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
      <p style={{ textAlign: "left", marginBottom: "50px" }}>
        Here, R12 will get all roles which have the same start date as the date
        selected. They have to select the right role code
      </p>
      <div class="title">Verify Values</div>
      <div class="form-container" style={{ marginBottom: "4px" }}>
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
      </div>
      <div class="form-container" style={{ marginBottom: "4px" }}>
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
      <div class="form-container">
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
      <div style={{ textAlign: "left", left: "100px" }}>
        <button className="rec-btn">Verify</button>
      </div>

      <p style={{ textAlign: "left", marginBottom: "60px" }}>
        Once this button is pressed, the role code is locked and data entered
        below will be sent with this particular role code attached to it
      </p>
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
            <th>Email</th>
            <th>Linkedin Profile</th>s<th>Attach Resume</th>
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
                value={candidateDetails.resume}
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
                type="text"
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
                value={candidateDetails.lastName}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </table>
      </div>
      <button
        onClick={handleSubmit}
        class="rec-btn"
        style={{ marginTop: "5px", marginBottom: "20px", alignContent: "1px" }}
      >
        Submit
      </button>

      <table class="table-container">
        
        <tr>
          <th>Role Code</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Linkedin Profile</th>
          <th>Attach Resume</th>
        </tr>
        <tr>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="file" className="custom-input" />
          </td>
        </tr>
        <tr>
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
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
          <td>
            <input type="text" className="custom-input" />
          </td>
        </tr>
      </table>
      <button class="rec-btn">Submit All Profiles</button>
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
