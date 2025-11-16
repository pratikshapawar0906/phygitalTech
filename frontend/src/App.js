import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router/AllRouter";
import { EmployeeProvider } from "./Context/EmployeeProvider";
import Navbar from "./Component/Navbar";
import "./Style/global.css";


function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;
