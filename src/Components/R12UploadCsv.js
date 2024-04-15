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

  const [uploadedData, setUploadedData] = useState([]);
  const [candidateDetailsArray, setCandidateDetailsArray] = useState([]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCandidateDetailsArray = [...candidateDetailsArray];
    updatedCandidateDetailsArray[index] = {
      ...updatedCandidateDetailsArray[index],
      [name]: value,
    };
    setCandidateDetailsArray(updatedCandidateDetailsArray);
  };

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
  const camelCaseKeys = (obj) => {
    const camelCaseObj = {};
    for (const key in obj) {
      const camelCaseKey = key
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
      camelCaseObj[camelCaseKey] = obj[key];
    }
    return camelCaseObj;
  };

  const handleCombineAndSubmit = async () => {
    try {
      const formData = new FormData();

      // Transform data to the desired format
      const transformedData = uploadedData.map((rowData, index) => {
        const candidateDetails = candidateDetailsArray[index] || {}; // Use empty object if candidate details are undefined
        const combinedRow = {
          ...rowData,
          ...candidateDetails,
          ...objectDetails,
        };

        const camelCaseCombinedRow = camelCaseKeys(combinedRow);

        const fieldsToSetEmptyString = [
          "roleCode",
          "experience",
          "sourceCode",
          "sourcingCode",
          "vendorCode",
          "r12Name",
          "r12Date",
          "candidateCode",
        ];

        fieldsToSetEmptyString.forEach((field) => {
          if (typeof camelCaseCombinedRow[field] === "undefined") {
            camelCaseCombinedRow[field] = "";
          }
        });

        if (camelCaseCombinedRow.hasOwnProperty("emailAddress")) {
          camelCaseCombinedRow.email = camelCaseCombinedRow.emailAddress;
          delete camelCaseCombinedRow.emailAddress;
        }

        if (camelCaseCombinedRow.hasOwnProperty("profileURL")) {
          camelCaseCombinedRow.linkedinProfile =
            camelCaseCombinedRow.profileURL;
          delete camelCaseCombinedRow.profileURL;
        }

        const excludedFields = [
          "activeProject",
          "currentCompany",
          "currentTitle",
          "feedback",
          "notes",
          "headline",
          "workingDays",
        ];

        excludedFields.forEach((field) => {
          delete camelCaseCombinedRow[field];
        });

        return camelCaseCombinedRow;
      });

      transformedData.forEach((candidate, index) => {
        // Append each candidate's data to formData
        for (const key in candidate) {
          formData.append(`candidates[${index}][${key}]`, candidate[key]);
        }

        // Append resume file if it exists for this candidate
        if (
          candidateDetailsArray[index] &&
          candidateDetailsArray[index].resume
        ) {
          formData.append(
            `candidates[${index}][resume]`,
            candidateDetailsArray[index].resume
          );
          console.log(`candidates[${index}][resume]`);
        }
      });
      console.log(transformedData.length === candidateDetailsArray.length);
      console.log(transformedData);
      console.log(candidateDetailsArray);
      transformedData.forEach((candidate, index) => {
        console.log(candidate === candidateDetailsArray[index]); // Check if the elements at the same index are the same object
      });
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      const response = await axios.post(
        "http://localhost:4000/api/candidates/6",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("upload csv done successfully");
      setUploadedData([])
      setCandidateDetailsArray([])
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleFileInputChange = (index, event) => {
    const { name, files } = event.target;
    const updatedCandidateDetailsArray = [...candidateDetailsArray];
    updatedCandidateDetailsArray[index] = {
      ...updatedCandidateDetailsArray[index],
      resume: files[0],
    };
    setCandidateDetailsArray(updatedCandidateDetailsArray);
  };

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>

        <div className="header1" style={{ paddingLeft: 0 }}>
          <h1 className="company-name">TheRecAI</h1>
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
            <table
              key={index}
              style={{
                paddingLeft: "10px",
                width: "100%",
                borderColor: "darkblue",
                borderCollapse: "separate", // Separate border model
                borderSpacing: "1px", // Spacing between table elements
                borderStyle: "solid", // Solid border style
                borderWidth: "3px", // Thick border width
                borderRadius: "10px", // Rounded corners
                marginBottom: "20px",
                backgroundColor: index % 2 === 0 ? "lightgrey" : "darkgrey",
              }}
            >
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
                style={{
                  marginBottom: "10px",
                  borderBlockStartWidth: "3px",
                  borderBlockStartColor: "ThreeDDarkShadow",
                }}
              >
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="roleCode"
                    value={candidateDetailsArray[index]?.roleCode || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="firstName"
                    value={rowData["First Name"]}
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
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="email"
                    defaultValue={rowData["Email Address"]}
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
                    onChange={(event) => handleFileInputChange(index, event)}

                    // Pass index and event to the function
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
              <tr>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="experience"
                    value={candidateDetailsArray[index]?.experience || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="sourceCode"
                    value={candidateDetailsArray[index]?.sourceCode || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="sourcingCode"
                    value={candidateDetailsArray[index]?.sourcingCode || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="vendorCode"
                    value={candidateDetailsArray[index]?.vendorCode || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="r12Name"
                    value={candidateDetailsArray[index]?.r12Name || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="r12Date"
                    value={candidateDetailsArray[index]?.r12Date || ""}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="custom-input"
                    style={{ width: "150px" }}
                    name="candidateCode"
                    value={candidateDetailsArray[index]?.candidateCode || ""}
                    onChange={(event) => handleInputChange(index, event)}
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
      <button
        className="rec-btn"
        style={{ marginTop: 5, marginLeft: "8%" }}
        onClick={handleCombineAndSubmit}
      >
        Submit All Profiles
      </button>
    </div>
  );
};

export default R12UploadCsv;
