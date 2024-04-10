import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const R12AddCandidate = ({ navigateToR12HomePage }) => {
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

  const handleSubmit = () => {
    // Add the current candidate details to the list of submitted candidates
    setSubmittedCandidates((prevCandidates) => [
      ...prevCandidates,
      candidateDetails,
    ]);
    console.log(submittedCandidates);
    // Clear the form after submission
    setCandidateDetails({
      roleCode: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      linkedinProfile: "",
      resume: "null",
      experience: "",
      sourceCode: "",
      sourcingCode: "",
      vendorCode: "",
      r12Name: "",
      r12Date: "",
      R13Name: "",
      R14Name: "",
      Remark: "",
      AcceptedOrRejected: "",
    });
  };

  const handleSubmitAllProfiles = async () => {
    try {
      for (const candidate of submittedCandidates) {
        console.log("Candidate:", candidate.roleCode);
        console.log(submittedCandidates.roleCode);
        const formData = new FormData();

        // Append candidate details to FormData

        const {
          companyName,
          role,
          location,
          technology,
          skill,
          StartingDate,
          R13Name,
          R14Name,
          Remark,
          AcceptedOrRejected,
        } = objectDetails;
        formData.append("companyName", companyName);
        formData.append("role", role);
        formData.append("location", location);
        formData.append("technology", technology);
        formData.append("skill", skill);
        formData.append("StartingDate", StartingDate);
        formData.append("R14Name", "");
        formData.append("Remark", "");
        formData.append("AcceptedOrRejected", "");
        formData.append("R13Name", "");
        formData.append("firstName", candidate.firstName);
        formData.append("lastName", candidate.lastName);
        formData.append("phoneNumber", candidate.phoneNumber);
        formData.append("email", candidate.email);
        formData.append("linkedinProfile", candidate.linkedinProfile);
        formData.append("experience", candidate.experience);
        formData.append("sourceCode", candidate.sourceCode);
        formData.append("sourcingCode", candidate.sourcingCode);
        formData.append("vendorCode", candidate.vendorCode);
        formData.append("r12Name", candidate.r12Name);
        formData.append("r12Date", candidate.r12Date);
        formData.append("candidateCode", candidate.candidateCode);

        // Append resume file
        formData.append("resume", candidate.resume);

        console.log("FormData:", formData);
        console.log(objectDetails);

        // Send FormData to backend
        const response = await axios.post(
          "http://localhost:4000/api/candidates",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Candidate submitted:", response.data);
      }

      // Reset state after successful submission
      alert("All profiles submitted successfully");
      // Clear submittedCandidates array
      setSubmittedCandidates([]);
      setCandidateDetails({
        roleCode: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      linkedinProfile: "",
      resume: "null",
      experience: "",
      sourceCode: "",
      sourcingCode: "",
      vendorCode: "",
      r12Name: "",
      r12Date: "",
      R13Name: "",
      R14Name: "",
      Remark: "",
      AcceptedOrRejected: "",
      });
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

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setCandidateDetails((prevDetails) => ({
      ...prevDetails,
      resume: file, // Store the File object
    }));

    // Reset the file input element
    event.target.value = null;
  };

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
          <button className="rec-btn2" onClick={navigateToR12HomePage}>
            R12HomePage
          </button>
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

      <div>
        <div
          style={{
            width: "80%",
            margin: "0 auto",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <table style={{ paddingLeft: "10px", width: "100%" }}>
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
                  //  value={candidateDetails.resume}
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

            <tr>
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
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="rec-btn"
        style={{
          marginTop: 5,
          marginBottom: 20,
          paddingLeft: 20,
          marginLeft: "10%",
        }}
      >
        Submit
      </button>

      <div>
        <div
          style={{
            width: "80%",
            margin: "0 auto",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          {submittedCandidates.length === 0 && (
            <table
              style={{
                paddingLeft: "10px",
                width: "100%",
                marginBottom: "25px",
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
                  <input type="file" name="resume" className="custom-input" />
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
          )}
          {submittedCandidates.map((candidate, index) => (
            <table
              key={index}
              style={{
                paddingLeft: "10px",
                width: "100%",
                marginBottom: "25px",
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

              <tr>
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
                <td>{candidate.experience}</td>
                <td>{candidate.sourceCode}</td>
                <td>{candidate.sourcingCode}</td>
                <td>{candidate.vendorCode}</td>
                <td>{candidate.r12Name}</td>
                <td>{candidate.r12Date}</td>
                <td>{candidate.candidateCode}</td>
              </tr>
            </table>
          ))}
        </div>
      </div>

      <button
        className="rec-btn"
        style={{ marginTop: 5, marginLeft: "8%" }}
        onClick={handleSubmitAllProfiles}
      >
        Submit All Profiles
      </button>
      <p style={{ paddingLeft: 10 }}>
        Whenever this button is pressed there will be an alert warning that they
        should verify all data once again. IN LATER VERSION WE WILL HAVE TO GIVE
        THEM AN OPTION TO ACCESS A PARTICULAR CANDIDATE AND UPDATE DATA IF THEY
        HAVE MADE A MISTAKE
      </p>
    </div>
  );
};

export default R12AddCandidate;
