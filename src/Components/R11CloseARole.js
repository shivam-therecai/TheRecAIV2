import React, { useState, useEffect } from "react";
import "./R-12.css";
import axios from "axios";

const R11CloseARole = ({ navigateToR11HomePage }) => {
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

  // Add state variables for other fields
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

 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (companyName && roleName) {
  //         console.log(companyName);
  //         console.log(roleName);
  //         console.log(startDate);

  //         const normalizedCompanyName = companyName.toLowerCase().trim();
  //         const normalizedRoleName = roleName.toLowerCase().trim();
  //         console.log(normalizedCompanyName);

  //         const response = await axios.get(
  //           "http://localhost:4000/api/R11Info/4",
  //           {
  //             params: {
  //               companyName: normalizedCompanyName,
  //               roleName: normalizedRoleName,
  //             },
  //           }
  //         );
  //         console.log(response);

  //         const filteredResponse = response.data.filter((entry) => {
  //           return (
  //             entry.companyName.toLowerCase().trim() ===
  //               normalizedCompanyName &&
  //             entry.role.toLowerCase().trim() === normalizedRoleName
  //           );
  //         });

  //         const fetchedObjectIds = filteredResponse.map((entry) => entry._id);

  //         setObjectIds(fetchedObjectIds);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [companyName, roleName]); // Include startDate as a string in the dependency array

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(event.target.value);
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

  const handleCloseRole = async () => {
    try {
      await axios.put(`http://localhost:4000/api/R11Info/${selectedObjectId}`, {
        roleStatus: "closed",
      });
      alert('Role Status is changed to closed')
      // Optionally, you can reset the state or perform any other action upon successful closure
    } catch (error) {
      console.error("Error closing role:", error);
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
          <h1 className="company-name">TheRecAI </h1>
        </div>
        <div className="header1">
          <button className="rec-btn2" onClick={navigateToR11HomePage}>
            R11HomePage
          </button>
        </div>
      </div>
      <div className="title">Role Variables</div>
      <div style={{ display: "flex", marginLeft: "10%", paddingLeft: "10px" }}>
        <input
          type="date"
          className="custom-input"
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
      <div style={{ paddingLeft: "165px" }}>
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
      <p style={{ paddingRight: "350px", marginBottom: "50px" }}>
        Here, R12 will get all roles which have the same start date as the date
        selected. They have to select the right role code
      </p>
      <div className="title">Verify Values</div>
      <div
        className="form-container"
        style={{ marginBottom: "4px", paddingLeft: "10px", marginLeft: "10%" }}
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
        style={{ marginBottom: "4px", paddingLeft: "10px", marginLeft: "10%" }}
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
      <button class="rec-btn" onClick={handleCloseRole}>Close a Role</button>
    </div>
  );
};

export default R11CloseARole;
