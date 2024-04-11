import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const R12UploadCsv = () => {
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
    AcceptedOrRejected: "",
  });
  const [submittedCandidates, setSubmittedCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (companyName && roleName && startDate) {
          const normalizedCompanyName = companyName.toLowerCase().trim();
          const normalizedRoleName = roleName.toLowerCase().trim();
          // Convert startDate to dd/mm/yyyy format
          const formattedStartDate = startDate.split("-").reverse().join("/");

          const response = await axios.get(
            "http://localhost:4000/api/R11Info/4",
            {
              params: {
                companyName: normalizedCompanyName,
                roleName: normalizedRoleName,
                StartingDate: formattedStartDate,
              },
            }
          );
          console.log(response);

          const filteredResponse = response.data.filter((entry) => {
            return (
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
  }, [companyName, roleName, startDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(startDate);
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

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setCandidateDetails((prevDetails) => ({
      ...prevDetails,
      resume: file, // Store the File object
    }));

    // Reset the file input element
    event.target.value = null;
  };

  const [uploadedData, setUploadedData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split("\n");

      const headers = lines[0].split(",").map((header) => header.trim()); // Split by comma

      const data = lines.slice(1).map((line) => {
        const values = line
          .split(",")
          .map((value) => value.replace(/['"]+/g, "").trim()); // Remove extra quotes and trim
        const rowData = {};

        if (values.length !== headers.length) {
          console.error(
            "Mismatch between headers and values:",
            headers,
            values
          );
          return null; // Skip this row
        }

        headers.forEach((header, index) => {
          rowData[header] = values[index];
        });

        return rowData;
      });

      setUploadedData(data.filter(Boolean)); // Filter out null rows
    };

    reader.readAsText(file);
  };

  console.log(uploadedData);

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>

        <div className="header1" style={{ paddingLeft: 0 }}>
          <h1 className="company-name">TheRecAI</h1>{" "}
        </div>
        <div className="header1">
          <button className="rec-btn2">R12HomePage</button>
        </div>
      </div>

      <div className="title">Role Variables</div>

      <div style={{ display: "flex", marginLeft: "10%", paddingLeft: "10px" }}>
        <input
          type="date"
          className="custom-input"
          name="start_date"
          id="start_date"
          placeholder="Enter Start Date"
          style={{ marginBottom: "5px" }}
          value={startDate}
          onChange={handleStartDateChange}
        />
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
        <label htmlFor="start_date" style={{ marginRight: 5 }}>
          Enter Start Date
        </label>
      </div>

      <p style={{ paddingLeft: 10 }}>
        R12 will keep a list of start date for all relevant roles, this will
        help them identify their role quickly
      </p>
      <div style={{ paddingLeft: 10, marginLeft: "10%" }}>
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

      <p style={{ paddingLeft: 10 }}>
        Here, R12 will get all roles which have the same start date as the date
        selected. They have to select the right role code
      </p>

      <div className="title">Verify Values</div>
      <div
        className="form-container"
        style={{ paddingLeft: 10, marginLeft: "10%" }}
      >
        <input
          type="text"
          className="text-box"
          placeholder="Company Name"
          value={objectDetails.companyName}
          readOnly
        />
        <input
          type="text"
          className="text-box"
          placeholder="Role Name"
          value={objectDetails.role}
          readOnly
        />
        <input
          type="text"
          className="text-box"
          placeholder="Date"
          value={objectDetails.StartingDate}
          readOnly
        />
        <input
          type="text"
          className="text-box"
          placeholder="Location"
          value={objectDetails.location}
          readOnly
        />
      </div>

      <div
        className="form-container"
        style={{ paddingLeft: 10, marginLeft: "10%" }}
      >
        <input
          type="text"
          className="text-box"
          placeholder="Technology"
          value={objectDetails.technology}
          readOnly
        />
        <input
          type="text"
          className="text-box"
          placeholder="Skills"
          value={objectDetails.skill}
          readOnly
        />
      </div>
      <p style={{ paddingLeft: 10 }}>
        R12 will look at this information and make sure they have selected the
        right role, for which they want to submit profiles
      </p>

      <div className="uploadcsv">
        <div
          style={{
            width: "80%",
            margin: "0 auto",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          {uploadedData.map((rowData, index) => (
            <table style={{paddingLeft: "10px",
            width: "100%",
            borderColor: "darkblue",
            borderCollapse: "separate", // Separate border model
            borderSpacing: "1px", // Spacing between table elements
            borderStyle: "solid", // Solid border style
            borderWidth: "3px", // Thick border width
            borderRadius: "10px", // Rounded corners
            marginBottom: "20px",
            backgroundColor: index % 2 === 0 ? "lightgrey" : "darkgrey",}}>
              <tr>
                <th>Role Code</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Linkedin Profile</th>
                <th>Attach Resume</th>
              </tr>
              <tr
                key={index}
                style={{ marginBottom: "10px", borderBlockStartWidth:'3px', borderBlockStartColor:'ThreeDDarkShadow',  }}
              >
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
                    value={rowData["First Name"]}
                    onClick={()=>{console.log(rowData['First Name'])}}
                    
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="lastName"
                    value={rowData["Last Name"]}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="phoneNumber"
                    value={rowData["Phone Number"]}
                    onClick={() => {
                      console.log(rowData["Phone Number"]);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="email"
                    value={rowData["Email Address"]}
                    onClick={function () {
                      console.log(rowData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="linkedinProfile"
                    value={rowData["Profile URL"]}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    style={{ width: "150px" }}
                    name="resume"
                    onChange={handleFileInputChange}
                  />
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
              <tr >
                <td>
                  <input
                    type="text"
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
                    value={candidateDetails.candidateCode}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            </table>
          ))}
        </div>
      </div>

      <input
        className="rec-btn"
        type="file"
        onChange={handleFileUpload}
        style={{
          marginTop: 5,
          marginBottom: 20,
          paddingLeft: 20,
          marginLeft: "10%",
        }}
        placeholder="Upload CSV"
      ></input>
    </div>
  );
};

export default R12UploadCsv;
