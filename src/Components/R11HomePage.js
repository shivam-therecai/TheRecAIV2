import './styles.css'

const R11HomePage = ({navigateToR11OpenARolePage,navigateToR11CloseARolePage}) => {
    return (
      <div>
        <div className="form-container1">
          <div class="header1">
            <img src="/logo.png" alt="Logo" height="60px" />
          </div>
          <div class="header1">
            <h1 class="company-name">TheRecAI</h1>
          </div>
          <div class="header1">
            <button class="rec-btn2">
              <a href="index.html">Home</a>
            </button>
          </div>
        </div>
        <div>
          <h1>R11 Home Page</h1>
        </div>
        <div class="r13-btn-container">
          <button class="rec-btn" onClick={navigateToR11OpenARolePage}>Open a Role</button>
          <button class="rec-btn" onClick={navigateToR11CloseARolePage}>Close a Role</button>
          <button class="rec-btn">Pause a Role</button>
          <button class="rec-btn"><a href="/">Add Role Details</a></button>
        </div>
      </div>
    );
  };
  
export default R11HomePage;