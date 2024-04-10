import React, { useEffect, useState } from "react";
import axios from "axios";

const Client = ({ navigateToVacancy }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/candidates",
          {
            params: {
              companyName: "Crux",
              AcceptedOrRejected: "Accepted",
              roleStatus: "Active",
            },
          }
        );
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <div className="form-container1">
        <div className="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div className="header1">
          <h1 className="company-name">Client</h1>
        </div>
        <div className="header1">
          <button className="rec-btn2">
            <a href="index.html">Home</a>
          </button>

          <img src="/crux.png" height="50px" alt="Crux logo" />
        </div>
      </div>

      <div className="calling-container">
        {candidates.map((candidate) => (
          <a
            href="VacancyButton.html"
            className="item-box4"
            key={candidate._id}
          >
            <div className="calling-image-container">
              {/* Render company logo if available */}
            </div>
            <div>
              <div style={{ textAlign: "left" }}>
                <ul>
                  <li>
                    <h4>
                      Role Name:{" "}
                      <span style={{ color: "brown" }}>{candidate.role}</span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Skills:{" "}
                      <span style={{ color: "brown" }}>{candidate.skill}</span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Experience:{" "}
                      <span style={{ color: "brown" }}>
                        {candidate.experience}
                      </span>{" "}
                    </h4>
                  </li>
                  <li>
                    <h4>
                      Technology:{" "}
                      <span style={{ color: "brown" }}>
                        {candidate.technology}
                      </span>{" "}
                    </h4>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Client;

// import "./styles.css";

// const Client = ({navigateToVacancy}) => {

//   return (
//     <div>
//       <div className="form-container1">
//         <div className="header1">
//           <img src="/logo.png" alt="Logo" height="70px" />
//         </div>
//         <div className="header1">
//           <h1 className="company-name">Clients</h1>
//         </div>
//         <div className="header1">
//           <button className="rec-btn2">
//             <a href="index.html">Home</a>
//           </button>
//           <button className="rec-btn2" onClick={navigateToVacancy}>
//             Vacancy
//           </button>
//           <img src="/crux.png" height="50px"></img>
//         </div>
//       </div>

//       <div className="header-calling">
//         <h2>List of Companies</h2>
//       </div>

//       <div className="calling-container">
//         <a href="VacancyButton.html" class="item-box4">
//           <div className="calling-image-container">
//             {/* <div className="image-calling">
//               <img src="/companyLogo.png" alt="" height="100px" />
//             </div>
//             <div className="calling-name">
//               <h3>Company Name</h3>
//             </div> */}
//           </div>
//           <div>
//             <div style={{ textAlign: 'left' }}>
//               <ul>
//                 <li>
//                   <h4>Role Name:-</h4>
//                 </li>
//                 <li>
//                   <h4>Skills:-</h4>
//                 </li>
//                 <li>
//                   <h4>Experience:-</h4>
//                 </li>
//                 <li>
//                   <h4>Technology:-</h4>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </a>

//         <a href="VacancyButton.html" className="item-box4">
//           <div className="calling-image-container">
//             {/* <div className="image-calling">
//               <img src="/companyLogo.png" alt="" height="100px" />
//             </div>
//             <div className="calling-name">
//               <h3>Company Name</h3>
//             </div> */}
//           </div>
//           <div>
//             <div style={{textAlign:'left'}}>
//               <ul>
//                 <li>
//                   <h4>Role Name:-</h4>
//                 </li>
//                 <li>
//                   <h4>Skills:-</h4>
//                 </li>
//                 <li>
//                   <h4>Experience:-</h4>
//                 </li>
//                 <li>
//                   <h4>Technology:-</h4>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Client;
