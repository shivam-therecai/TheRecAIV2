import React,{useState} from "react";

import "./App.css";
import SalesForm from "./Components/salesForm";
import R11 from "./Components/R-11";
import R12 from "./Components/R-12";


function App() {

  const [currentPage, setCurrentPage] = useState('sales');
  const navigateToSales = () => {
    setCurrentPage('sales');
  };

  const navigateToR11 = () => {
    setCurrentPage('r11');
  };
  const navigateToR12 = () => {
    setCurrentPage('r12');
  };

  const [r11,setr11]=useState(false)
  return (
    <div className="App">
      <header>
        {/* <h1>Navigation Example</h1> */}
        <nav>
          <button onClick={navigateToSales}>Sales Form</button>
          <button onClick={navigateToR11}>Go to R11</button>
          <button onClick={navigateToR12}>Go to R12</button>
        </nav>
      </header>

      <main>
        {currentPage === 'sales' && <SalesForm />}
        {currentPage === 'r11' && <R11 />}
        {currentPage === 'r12' && <R12 />}
      </main>
    </div>
  );
}

  
export default App;
