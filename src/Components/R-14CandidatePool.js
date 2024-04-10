import React, { useEffect, useState } from "react";
import axios from "axios";

const R14CandidatePool = () => {
  const [candidates, setCandidates] = useState([]);
  // const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [selectedR14Names, setSelectedR14Names] = useState({});
 
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/candidates/6"
        );
        console.log('hi there')
        const filteredCandidates = response.data.filter(
          (candidate) =>
            candidate.AcceptedOrRejected === "Accepted" && candidate.R14Name===""
        );
        const initialSelectedR14Names = {};
        filteredCandidates.forEach((candidate) => {
          initialSelectedR14Names[candidate._id] = "";
        });
        setSelectedR14Names(initialSelectedR14Names);
        setCandidates(filteredCandidates);
        console.log(filteredCandidates);
      } catch (error) {
        console.error("Error fetching accepted candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleChange = (event, candidateId) => {
    setSelectedR14Names((prevSelectedR14Names) => ({
      ...prevSelectedR14Names,
      [candidateId]: event.target.value,
    }));
  };

 
  const handleSubmit = async (selectedCandidateId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/candidatepool/candidates/r14/${selectedCandidateId}`,
        {
          R14Name: selectedR14Names[selectedCandidateId],
        }
      );

      // Update the state to remove the selected candidate
      setCandidates((prevCandidates) =>
        prevCandidates.filter(
          (candidate) => candidate._id !== selectedCandidateId
        )
      );
      // Clear the selected R14Name for the submitted candidate
      setSelectedR14Names((prevSelectedR14Names) => ({
        ...prevSelectedR14Names,
        [selectedCandidateId]: "",
      }));
      alert("R14Name has been updated!");
    } catch (error) {
      console.error("Error updating R14Name:", error);
    }
  };

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div className="header1">
          <h1 className="company-name">TheRecAI Calling Pool</h1>
        </div>
        <div className="header1">
          <button className="rec-btn2">
            <a href="index.html">Home</a>
          </button>
          <button className="rec-btn2">
            <a href="R14.html">R14</a>
          </button>
        </div>
      </div>

      <div className="header-calling">
        <h2>List of Candidates</h2>
      </div>

      <div className="calling-container">
        {candidates.map((candidate) => (
          <div
            className="item-box"
            key={candidate._id}
            style={{ width: "600px", height: "200px" }}
          >
            <div className="calling-image-container">
              {/* <div className="image-calling">
                <img src="/4974985.png" alt="" height="130px" />
              </div> */}
              <div className="calling-name">
                <h3>
                  {candidate.firstName} {candidate.lastName}
                </h3>
                <h4>{candidate.role}</h4>
                <div className="linked-in">
                  <img src="/icons8-linkedin-48.png" alt="" />
                  <img src="/icons8-phone-50.png" alt="" height="46px" />
                </div>
              </div>
            </div>
            <div>
              <button
                className="rec-btn"
                style={{ marginRight: "3px", marginLeft: "-80px" }}
              >
                View Resume
              </button>
              <button className="rec-btn" style={{ marginRight: "3px" }}>
                Save Comment
              </button>
              <button
                className="rec-btn"
                onClick={() => handleSubmit(candidate._id)} // Capture selected candidate ID
                type="button"
              >
                Confirm
              </button>
              <select
                className="rec-btn"
                style={{
                  backgroundColor: "lightgrey",
                  marginRight: "20px",
                  marginTop: "8px",
                  width: "173px",
                  color: "black",
                  border: "black",
                }}
                value={selectedR14Names[candidate._id]}
                onChange={(e) => handleChange(e, candidate._id)}
              >
                <option disabled selected value="">
                  Assign (R14Name)
                </option>
                <option value="Chandani">Chandani</option>
                <option value="Silfa">Silfa</option>
                <option value="Namrata">Namrata</option>
                <option value="Pradnya">Pradnya</option>
              </select>

              <textarea
                style={{ marginLeft: "-45px" }}
                className="comment-box"
                placeholder="Enter your comment here..."
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default R14CandidatePool;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const R14CandidatePool = () => {
//   // const [acceptedCandidates, setAcceptedCandidates] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [selectedCandidateId, setSelectedCandidateId] = useState("");
//   const [selectedR14Name, setSelectedR14Name] = useState("");

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/AcceptedR14/candidates"
//         );
//         const filteredCandidates = response.data.filter(
//           (candidate) =>
//             candidate.AcceptedOrRejected === "Accepted" && !candidate.R14Name
//         );
//         setCandidates(filteredCandidates);
//       } catch (error) {
//         console.error("Error fetching accepted candidates:", error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   const handleChange = (event) => {
//     setSelectedR14Name(event.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.put(
//         `http://localhost:4000/api/candidates/candidatepool/${selectedCandidateId}`,
//         {
//           R14Name: selectedR14Name,
//         }
//       );

//       // Update the state to remove the selected candidate
//       setCandidates((prevCandidates) =>
//         prevCandidates.filter(
//           (candidate) => candidate._id !== selectedCandidateId
//         )
//       );
//       setSelectedR14Name(""); // Clear the selected R14Name
//       alert("R14Name has been updated!");
//     } catch (error) {
//       console.error("Error updating R14Name:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="form-container1">{/* Header */}</div>

//       <div className="header-calling">
//         <h2>List of Candidates</h2>
//       </div>

//       <div className="calling-container">
//         {candidates.map((candidate) => (
//           <div className="item-box" key={candidate._id}>
//             <div className="calling-image-container">
//               <div className="image-calling">
//                 <img src="/4974985.png" alt="" height="130px" />
//               </div>
//               <div className="calling-name">
//                 <h3>
//                   {candidate.firstName} {candidate.lastName}
//                 </h3>
//                 <h4>{candidate.role}</h4>
//                 <div className="linked-in">
//                   <img src="/icons8-linkedin-48.png" alt="" />
//                   <img src="/icons8-phone-50.png" alt="" height="46px" />
//                 </div>
//               </div>
//             </div>
//             <div>
//               <button className="rec-btn" style={{ marginRight: "3px" }}>
//                 View Resume
//               </button>
//               <button className="rec-btn" style={{ marginRight: "3px" }}>
//                 Edit Comment
//               </button>
//               <select
//                 className="rec-btn"
//                 style={{ backgroundColor: "blue", marginRight: "3px" }}
//                 value={selectedR14Name}
//                 onChange={handleChange}
//               >
//                 <option disabled selected value="">
//                   Select R14Name
//                 </option>
//                 <option value="Chandani">Chandani</option>
//                 <option value="Silfa">Silfa</option>
//                 <option value="Namrata">Namrata</option>
//                 <option value="Pradnya">Pradnya</option>
//               </select>
//               <button className="rec-btn" onClick={handleSubmit} type="button">
//                 Confirm
//               </button>
//               <textarea
//                 style={{ marginLeft: "-45px" }}
//                 className="comment-box"
//                 placeholder="Enter your comment here..."
//               ></textarea>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default R14CandidatePool;
