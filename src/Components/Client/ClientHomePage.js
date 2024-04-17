import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientHomePage.css";

const ClientHomePage = ({ navigateToClientPage }) => {
  const [accountNames, setAccountNames] = useState([]);

  // Fetch account names from the backend when the component mounts

  useEffect(() => {
    const fetchAccountNames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/accounts");
        setAccountNames(response.data);
      } catch (error) {
        console.error("Error fetching account names:", error);
      }
    };

    fetchAccountNames();
  }, []);

  const getLogoSource = (accountName) =>
    `/${accountName.replace(/\s+/g, "")}.png`;

  const handleNavigateToClient = (accountName) => {
    navigateToClientPage(accountName);
  };

  
  return (
    <div className="container">
      <h1 className="heading">Welcome to Client Portal</h1>
      <div className="button-container" style={{display:'inline-block', marginBottom:'1px', justifyContent:'center'}}>
        {/* Map over accountNames to generate buttons dynamically */}
        {accountNames.map((accountName, index) => (
          <button
            key={index}
            className="button"
            onClick={() => handleNavigateToClient(accountName)}
            style={{marginBottom:'80px'}}
            
          >
            <div className="button-content">
              <img
                src={getLogoSource(accountName)}
                alt={accountName}
                className="logo"
              />
              <span>{accountName}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClientHomePage;
