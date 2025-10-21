import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServicesDashboard from "./ServiceDashboard/ServicesDashboard";
import Mainlayout from "./Layout/Mianlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          {/* Nested routes rendered inside <Outlet /> */}
        <Route path="/services" element={<ServicesDashboard />}></Route>
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
