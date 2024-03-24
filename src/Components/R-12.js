import React from "react";
import "./R-12.css";

const R12 = () => {
  return (
    <div>
 <div className="form-container1" >
      <div className="header1">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" height="70px" />
      </div>
      <div className="header1" style={{ textAlign: "center", marginright:'1000px', marginLeft:'20px' }}>
        {/* Company Name */}
        <h1 className="company-name">TheRecAI</h1>
      </div>
    </div>
      <div class="title">Role Variables</div>
      <div style={{display:'flex'}}>
        <input
          type="date"
          class="custom-input"
          name=""
          id=""
          placeholder="Enter Start Date"
          style={{marginBottom:'5px'}}
        ></input>
        <input placeholder="Enter company name" style={{width:'250px', height:"48px", borderRadius:'4px', marginBottom:'10px', marginLeft:'5px'}}></input>
        <input placeholder="Enter role name" style={{width:'250px', height:"48px", borderRadius:'4px', marginBottom:'10px',marginLeft:'5px'}}></input>
      </div>

      <p style={{textAlign:'left'}}>Enter Start Date</p>
      <p style={{textAlign:'left', marginBottom:'40px'}}>
        R12 will keep a list of start date for all relevant roles, this will
        help them identify their role quickly
      </p>
      <select name="roleCode" id="" class="custom-input">
        <option>Populate</option>
        <option>All the</option>
        <option>Relevant Options</option>
        <option>Here</option>
      </select>
      <p style={{textAlign:'left', marginBottom:'50px'}} >
        Here, R12 will get all roles which have the same start date as the date
        selected. They have to select the right role code
      </p>
      <div class="title">Verify Values</div>
      <div class="form-container" style={{marginBottom:'4px'}}>
        <input type="text" class="text-box" placeholder="Company Name" />
        <input type="text" class="text-box" placeholder="Role Name" />
      </div>
      <div class="form-container" style={{marginBottom:'4px'}}>
        <input type="text" class="text-box" placeholder="Date" />
        <input type="text" class="text-box" placeholder="Location" />
      </div>
      <div class="form-container">
        <input type="text" class="text-box" placeholder="Technology" />
        <input type="text" class="text-box" placeholder="Skills" />
      </div>
      <p style={{textAlign:'left'}}>
        R12 will look at this information and make sure they have selected the
        right role, for which they want to submit profiles
      </p>
      <div style={{textAlign:'left', left:'100px'}}><button className="rec-btn" >Verify</button></div>
      
      <p style={{textAlign:'left', marginBottom:'60px'}}>
        Once this button is pressed, the role code is locked and data entered
        below will be sent with this particular role code attached to it
      </p>
      <div
        className="table-container"
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          marginBottom: "5px",
          paddingBottom: "10px",
        }}
      >
        <table class="abc">
          <tr>
            <th>Role Code</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Linkedin Profile</th>
            <th>Attach Resume</th>
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
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="file"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="number"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
            <td>
              <input
                type="text"
                className="custom-input"
                style={{ width: "150px" }}
              />
            </td>
          </tr>
        </table>
      </div>
      <button
        class="rec-btn"
        style={{ marginTop: "5px", marginBottom: "20px", alignContent: "1px" }}
      >
        Submit
      </button>

      <table class="table-container">
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
            <input type="file" className="custom-input" />
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
      <button class="rec-btn">Submit All Profiles</button>
      <p>
        Whenever this button is pressed there will be an alert warning that they
        should verify all data once again. IN LATER VERSION WE WILL HAVE TO GIVE
        THEM AN OPTION TO ACCESS A PARTICULAR CANDIDATE AND UPDATE DATA IF THEY
        HAVE MADE A MISTAKE
      </p>
    </div>
  );
};

export default R12;
