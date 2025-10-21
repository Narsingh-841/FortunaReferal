import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServicesDashboard from "./ServiceDashboard/ServicesDashboard";
import Mainlayout from "./Layout/Mianlayout";
import ReferralTable from "./Referral/ReferralTable";
import AddNewReferralPage from "./Referral/AddNewReferralPage.tsx";
import ClientList from "./ClientsList/ClientList.tsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          {/* Nested routes rendered inside <Outlet /> */}
          <Route path="/services" element={<ServicesDashboard />} />
          <Route path="/my-referrals" element={<ReferralTable />} />
          <Route path="/my-referrals/new" element={<AddNewReferralPage />} />
          <Route path="/clients" element={<ClientList />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;