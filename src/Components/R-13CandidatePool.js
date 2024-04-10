import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const R13CandidatePool = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/candidates?R13Name="
        );
          console.log(response);
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeCategory = (rowData, event) => {
    const selectedCategory = event.target.value;
    // Update the category value in the rowData object
    rowData.category = selectedCategory;
    console.log(selectedCategory);
    // Optionally, you can update the state or perform any other actions here
  };

  const handleConfirm = async (rowData) => {
    try {
      console.log(rowData._id);
      // Fetch first name, last name, and role name from the backend
      const candidateDetailsResponse = await axios.get(
        `http://localhost:4000/api/candidates/details/${rowData._id}`
      );
      console.log(candidateDetailsResponse);
      const { firstName, lastName, roleName } = candidateDetailsResponse.data;
      console.log(firstName);
      // Get the category value from the rowData object
      const category = rowData.category;
      console.log(rowData);
      const { technology, skill, location, experience, companyName, role } =
        rowData;
      // Combine row data with additional details
      const dataToSend = {
        technology,
        skill,
        location,
        experience,
        companyName,
        role,
        R13Name: category,
        firstName,
        lastName,
        roleName,
      };
      console.log(dataToSend);
      const dataToSendToR13 ={R13Name: category}

      await axios.put(
        `http://localhost:4000/api/candidates/update/${rowData._id}`,
        dataToSendToR13
      );
      // Send the data to the respective API endpoint
      await axios.post(
        `http://localhost:4000/api/candidates/details/${category}`,
        dataToSend
      );
      
      // Remove the confirmed row from the candidates state
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate._id !== rowData._id)
      );
    } catch (error) {
      console.error("Error confirming candidate:", error);
    }
  };

  return (
    <div>
      <div className="form-container1">
        <div class="header1">
          <img src="/logo.png" alt="Logo" height="70px" />{" "}
        </div>
        <div class="header1">
          <h1 class="company-name">TheRecAI Candidate Pool</h1>{" "}
        </div>
        <div class="header1">
          <button class="rec-btn2">
            <a href="R13.html">Back to R13</a>{" "}
          </button>
        </div>

        {/* Header */}
      </div>

      <div
        class="table-container"
        style={{
          maxHeight: "50000px",
          overflowX: "auto",
          overflowY: "hidden",
          marginBottom: "5px",
          paddingBottom: "10px",
        }}
      >
        <table className="abc" style={{ minWidth: "100%" }}>
          {/* Table Headers */}
          <thead>
            <tr>
              <th style={{ width: "150px" }}>First Name</th>
              <th style={{ width: "150px" }}>Last Name</th>
              <th style={{ width: "150px" }}>Technology</th>
              <th style={{ width: "150px" }}>Skill</th>
              <th style={{ width: "150px" }}>Experience</th>
              <th style={{ width: "150px" }}>Company Name</th>
              <th style={{ width: "150px" }}>Role Name</th>
              <th style={{ width: "150px" }}>Location</th>
              <th style={{ width: "150px" }}>
                Company Category 1 (Gets pulled)
              </th>
              <th style={{ width: "150px" }}>
                Company Category 2 (Gets pulled)
              </th>
              <th style={{ width: "150px" }}>
                Company Category 3 (Gets pulled)
              </th>
              <th style={{ width: "150px" }}>
                Assign Counter (Derived, auto-updated)
              </th>
              <th style={{ width: "250px" }}>R13 Name (Assign)</th>
              <th style={{ width: "150px" }}>Confirm</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamically populate table rows */}
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.firstName}</td>
                <td>{candidate.lastName}</td>
                <td>{candidate.technology}</td>
                <td>{candidate.skill}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.companyName}</td>
                <td>{candidate.role}</td>
                <td>{candidate.location}</td>
                <td>{/* Placeholder for Company Category 1 */}</td>
                <td>{/* Placeholder for Company Category 2 */}</td>
                <td>{/* Placeholder for Company Category 3 */}</td>
                <td>{/* Placeholder for Assign Counter */}</td>
                <td>
                  <select
                    className="custom-input"
                    onChange={(event) => handleChangeCategory(candidate, event)}
                  >
                    <option value="">Select</option>
                    <option value="Chandani">Chandani</option>
                    <option value="Silfa">Silfa</option>
                    <option value="Namrata">Namrata</option>
                    <option value="Pradnya">Pradnya</option>
                  </select>
                </td>
                <td>
                  <button
                    type="button"
                    className="rec-btn"
                    onClick={() => handleConfirm(candidate)}
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default R13CandidatePool;
