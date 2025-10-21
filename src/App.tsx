import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServicesDashboard from "./ServiceDashboard/ServicesDashboard";
import Mainlayout from "./Layout/Mianlayout";
import ReferralTable from "./Referral/ReferralTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          {/* Nested routes rendered inside <Outlet /> */}
        <Route path="/services" element={<ServicesDashboard />}></Route>
        <Route path="/my-referrals" element={<ReferralTable />}></Route>
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
