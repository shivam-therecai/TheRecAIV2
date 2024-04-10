import React from "react";

const CandidateForClientRole = ({ candidate }) => {
  if (!candidate) {
    return (
      <div>
        Fetching...
      </div>
    ); // Or any other placeholder or loading indicator
  }
  
  console.log(candidate);
  return (
    <div>
      <div class="form-container1">
        <div class="header1">
          <img src="/logo.png" alt="Logo" height="70px" />
        </div>
        <div class="header1">
          <h1 class="company-name">TheRecAI</h1>
        </div>
        <div class="header1">
          <button class="rec-btn2">
            <a href="index.html">Home</a>
          </button>
          <button class="rec-btn2">
            <a href="R14.html">R14</a>
          </button>
        </div>
      </div>

      <div class="header-calling">
        <h2>List of Candidates</h2>
      </div>

      <div class="calling-container">
      {candidate.map((cand) => (
          <div class="item-box1">
            <div class="item-box6">
              <div class="calling-image-container">
                <div class="calling-name">
                  <h3>
                    {cand.firstName} {cand.lastName}
                  </h3>
                  <h4>{cand.role}</h4>

                  <div class="linked-in">
                    <img src="/icons8-linkedin-48.png" alt="" />
                    <img src="/icons8-phone-50.png" alt="" height="46px" />
                  </div>
                </div>
              </div>
              <div>
                <button class="rec-btn" style={{ marginLeft: "-100px" }}>
                  View Resume
                </button>

                <textarea
                  class="comment-box"
                  placeholder="Enter your comment here..."
                  style={{ height: "100px", width: "95%" }}
                ></textarea>
              </div>
            </div>

            <div class="item-box5">
              <div class="stage-btn-con">
                <div>
                  <select
                    id="Box1"
                    class="text-box "
                    style={{ margin: "0 auto", width: "128px" }}
                  >
                    <option disabled selected>
                      Select
                    </option>
                    <option>Shared</option>
                    <option>Interviewed</option>
                    <option>Rejected</option>
                    <option>Backout</option>
                    <option>Selected</option>
                    <option>Joined</option>
                    <option>Stages</option>
                  </select>
                </div>
                <div>
                  <button class="rec-btn">Save Comments</button>
                </div>
                <div>
                  <button class="rec-btn">Rejected</button>
                </div>
                <div>
                  <button class="rec-btn">Accepted</button>
                </div>
              </div>

              <div>
                <textarea
                  class="comment-box"
                  placeholder="Enter your comment here ..."
                  style={{ margin: "10px", height: "130px", width: "200px" }}
                ></textarea>
              </div>
            </div>

            <div class="item-box5">
              <div>
                <textarea
                  class="comment-box"
                  placeholder="Enter your comment here ..."
                  style={{ margin: "10px", height: "110px", width: "300px" }}
                ></textarea>
                <button
                  className="rec-btn"
                  style={{
                    marginBottom: "5px",
                    padding: "10px",
                    marginLeft: "-50px",
                    marginTop: "3px",
                  }}
                >
                  Client's Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateForClientRole;
