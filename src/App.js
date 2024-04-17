import React, { useState, useEffect } from "react";
import "./App.css";
import SalesForm from "./Components/salesForm";
import R11 from "./Components/R-11";
import R12 from "./Components/R-12";
import R13 from "./Components/R-13";
import R13CandidatePool from "./Components/R-13CandidatePool";
import R13CallingPool from "./Components/R-13CallingPool";
import R14 from "./Components/R-14";
import R14CandidatePool from "./Components/R-14CandidatePool";
import R14ActivePool from "./Components/R-14ActivePool";
// import Client from "./Components/Client_Crux";
// import Vacancy from "./Components/Vacancy";
// import ClientFinanacePeer from "./Components/Client_FinancePeer";
import R11HomePage from "./Components/R11HomePage";
import R11CloseARole from "./Components/R11CloseARole";
import R11OpenARole from "./Components/R11OpenARole";
import R12HomePage from "./Components/R12HomePage";
import R12Candidate from "./Components/R12Candidate";
import R12AddCandidate from "./Components/R12AddACandidate";
import ClientHomePage from "./Components/Client/ClientHomePage";
import CruxTechClient from "./Components/Client/ClientPageTemplate";
import FinanacePeerClient from "./Components/Client/FinanacePeerClient";
import CandidateForClientRole from "./Components/Client/CandidatesForClientRole/CandidateForClientRole";
import ClientPageTemplate from "./Components/Client/ClientPageTemplate";
import R12UploadCsv from "./Components/R12UploadCsv";
import axios from 'axios';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage || "sales";
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    return storedCategory || "";
  });

  const [selectedR12Name, setSelectedR12Name] = useState(""); // Define selectedR12Name state
  const [selectedR14Name, setSelectedR14Name] = useState(""); // Define selectedR12Name state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const storedCandidate = localStorage.getItem("selectedCandidate");
    if (storedCandidate) {
      setSelectedCandidate(JSON.parse(storedCandidate));
    }
  }, []);

  

  const navigateToClientPage = (accountName) => {
    setSelectedClient(accountName);
    setCurrentPage("client");
  };

  const navigateToSales = () => {
    setCurrentPage("sales");
  };

  const navigateToR11HomePage = () => {
    setCurrentPage("r11homepage");
  };
  const navigateToR11CloseARolePage = () => {
    setCurrentPage("r11closearolepage");
  };
  const navigateToR11OpenARolePage = () => {
    setCurrentPage("r11openarolepage");
  };

  const navigateToR12HomePage = () => {
    setCurrentPage("r12homepage");
  };
  const navigateToR12Candidate = (selectedR12Name) => {
    setCurrentPage("r12candidate");
    setSelectedR12Name(selectedR12Name);
  };

  const navigateToR12AddCandidate = () => {
    setCurrentPage("r12addcandidate");
  };

  const navigateToR13 = () => {
    setCurrentPage("r13");
  };

  const navigateToR13CandidatePool = () => {
    setCurrentPage("r13CandidatePool");
  };

  const navigateToR13CallingPool = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setCurrentPage("r13CallingPool");
  };
  const navigateToR14 = () => {
    setCurrentPage("r14");
  };
  const navigateToR14CandidatePool = () => {
    setCurrentPage("r14CandidatePool");
  };
  const navigateToR14ActivePool = (selectedR14Name) => {
    setSelectedR14Name(selectedR14Name);
    setCurrentPage("r14ActivePool");
  };
  const navigateToClient = () => {
    setCurrentPage("client");
  };
  const navigateToFinancePeer = () => {
    setCurrentPage("clientFinanacePeer");
  };
  const navigateToVacancy = () => {
    setCurrentPage("vacancy");
  };
  const navigateToClientHomePage = () => {
    setCurrentPage("clientHomePage");
  };

  const navigateToCruxTech = () => {
    setCurrentPage("cruxTech");
  };

  const navigateToFinancePeerClient = () => {
    setCurrentPage("financePeer");
  };

  const navigateToCandidateForClientRole = (selectedCandidate) => {
    // Store selected candidate in localStorage
    localStorage.setItem(
      "selectedCandidate",
      JSON.stringify(selectedCandidate)
    );
    // Update state
    setSelectedCandidate(selectedCandidate);
    setCurrentPage("candidateForClientRole");
  };

  const navigateToR12UploadCsv=()=>{
    setCurrentPage('r12uploadcsv')
  }

  // const ClientPageWrapper = ({ selectedClient }) => {
  //   switch (selectedClient) {
  //     case "Crux Technologies":
  //       return <CruxTechClient />;
  //     case "FinancePeer":
  //       return <FinancePeerClient />;
  //     // Add cases for other clients
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="App">
      <header>
        <nav>
          <button style={{ marginRight: "2px" }} onClick={navigateToSales}>
            Sales Form
          </button>
          <button
            style={{ marginRight: "2px" }}
            onClick={navigateToR11HomePage}
          >
            R11HomePage
          </button>
          <button
            style={{ marginRight: "2px" }}
            onClick={navigateToR12HomePage}
          >
            R12HomePage
          </button>

          {/* <button style={{ marginRight: "2px" }} onClick={navigateToR12}>
            R12
          </button> */}
          <button style={{ marginRight: "2px" }} onClick={navigateToR13}>
            R13
          </button>
          <button style={{ marginRight: "2px" }} onClick={navigateToR14}>
            R14
          </button>
          <button
            style={{ marginRight: "2px" }}
            onClick={navigateToClientHomePage}
          >
            Client HomePage
          </button>
        </nav>
      </header>

      <main>
        {currentPage === "sales" && <SalesForm />}
        {currentPage === "r11homepage" && (
          <R11HomePage
            navigateToR11CloseARolePage={navigateToR11CloseARolePage}
            navigateToR11OpenARolePage={navigateToR11OpenARolePage}
          />
        )}
        {currentPage === "r11closearolepage" && (
          <R11CloseARole navigateToR11HomePage={navigateToR11HomePage} />
        )}
        {currentPage === "r11openarolepage" && (
          <R11OpenARole navigateToR11HomePage={navigateToR11HomePage} />
        )}

        {currentPage === "r12homepage" && (
          <R12HomePage
            navigateToR12AddCandidate={navigateToR12AddCandidate}
            navigateToR12Candidate={navigateToR12Candidate}
            navigateToR12UploadCsv={navigateToR12UploadCsv}
          />
        )}
        {currentPage==='r12uploadcsv' && <R12UploadCsv/>}
        {currentPage === "r12candidate" && ( // Fix here
          <R12Candidate
            selectedR12Name={selectedR12Name}
            navigateToR12HomePage={navigateToR12HomePage}
          />
        )}
        {currentPage === "r12addcandidate" && (
          <R12AddCandidate navigateToR12HomePage={navigateToR12HomePage} />
        )}

        {/* {currentPage === "r12" && <R12 />} */}

        {currentPage === "r13" && (
          <R13
            navigateToR13CandidatePool={navigateToR13CandidatePool}
            navigateToR13CallingPool={navigateToR13CallingPool}
          />
        )}
        {currentPage === "r13CandidatePool" && <R13CandidatePool />}
        {currentPage === "r13CallingPool" && (
          <R13CallingPool selectedCategory={selectedCategory} />
        )}
        {currentPage === "r14" && (
          <R14
            navigateToR14CandidatePool={navigateToR14CandidatePool}
            navigateToR14ActivePool={navigateToR14ActivePool}
          />
        )}

        {currentPage === "r14CandidatePool" && <R14CandidatePool />}
        {currentPage === "r14ActivePool" && (
          <R14ActivePool
            navigateToClient={navigateToClient}
            navigateToFinancePeer={navigateToFinancePeer}
            selectedR14Name={selectedR14Name}
          />
        )}

        {/* {currentPage === "vacancy" && (
          <Vacancy navigateToClient={navigateToClient} />
        )}
        {currentPage === "clientFinanacePeer" && <ClientFinanacePeer />} */}

        {currentPage === "clientHomePage" && (
          <ClientHomePage navigateToClientPage={navigateToClientPage} />
        )}
        {currentPage === "client" && selectedClient && (
          <ClientPageTemplate
            accountName={selectedClient}
            navigateToCandidateForClientRole={navigateToCandidateForClientRole}
          />
        )}

        {currentPage === "candidateForClientRole" && (
          <CandidateForClientRole candidate={selectedCandidate}  navigateToClient={navigateToClient}/>
        )}
      </main>
    </div>
  );
}

export default App;
