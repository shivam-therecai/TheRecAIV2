import React, { useState } from "react";
import axios from "axios"; // For making HTTP requests
import "./salesForm.css";
//We will add some changes in the design like making the entries in 2 rows instead of a
//single spreaded horizontal role which we have to scroll. that changes will be maded in the next version that we will make.
const SalesForm = () => {
  const [formData, setFormData] = useState({
    accountName: "",
    ctcPercentage: "",
    fixedCharge: "",
    ctcMinValid: "",
    ctcMaxValid: "",
    ctcComponents: "",
    invoiceRaiseDay: "",
    dueDays: "",
    location: "",
    billingName: "",
    billAddress: "",
    gst: "",
  });

  /////---------------------------------------------------THIS SENDS THE POST REQUEST TO THE DESIRED ADDRESS------------------//
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend route (e.g., '/api/accounts')
      await axios.post("http://localhost:4000/api/accounts", formData);
      console.log("Sales data submitted successfully!");
      alert("Sales data submitted successfully");
      setFormData({
        accountName: "",
        ctcPercentage: "",
        fixedCharge: "",
        ctcMinValid: "",
        ctcMaxValid: "",
        ctcComponents: "",
        invoiceRaiseDay: "",
        dueDays: "",
        location: "",
        billingName: "",
        billAddress: "",
        gst: "",
      });
    } catch (error) {
      console.error("Error submitting sales data:", error);
    }
  };

  return (
    <div>
      <h1>Account Information</h1>
      <table>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>CTC %</th>
            <th>Fixed Charge</th>
            <th>CTC % Valid for Min CTC</th>
            <th>CTC % Valid for Max CTC</th>
            <th>CTC Components</th>
            <th>Invoice Raise Day (Day 1 = DoJ)</th>
            <th>Due Days</th>
            <th>Location</th>
            <th>Billing Name</th>
            <th>Bill Address</th>
            <th>GST</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) => {
                  setFormData({ ...formData, accountName: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.ctcPercentage}
                onChange={(e) => {
                  setFormData({ ...formData, ctcPercentage: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.fixedCharge}
                onChange={(e) => {
                  setFormData({ ...formData, fixedCharge: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.ctcMinValid}
                onChange={(e) => {
                  setFormData({ ...formData, ctcMinValid: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.ctcMaxValid}
                onChange={(e) => {
                  setFormData({ ...formData, ctcMaxValid: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.ctcComponents}
                onChange={(e) => {
                  setFormData({ ...formData, ctcComponents: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.invoiceRaiseDay}
                onChange={(e) => {
                  setFormData({ ...formData, invoiceRaiseDay: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.dueDays}
                onChange={(e) => {
                  setFormData({ ...formData, dueDays: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.billingName}
                onChange={(e) => {
                  setFormData({ ...formData, billingName: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.billAddress}
                onChange={(e) => {
                  setFormData({ ...formData, billAddress: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={formData.gst}
                onChange={(e) => {
                  setFormData({ ...formData, gst: e.target.value });
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SalesForm;
