import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ServicesDashboard from "./ServiceDashboard/ServicesDashboard";
import Mainlayout from "./Layout/Mianlayout";
import ReferralTable from "./Referral/ReferralTable";
import AddNewReferralPage from "./Referral/AddNewReferralPage.tsx";
import ClientList from "./ClientsList/ClientList.tsx";
import FilesPage from "./Uploads/FilesPage.tsx";
import CalendarPage from "./Calender/CalendarPage.tsx";
import ClientDetails from "./ClientDetails/ClientDetails.tsx";


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
          <Route path="/uploads" element={<FilesPage/>} />
          <Route path="/calendar" element={<CalendarPage/>} />
          <Route path="/client/:clientName" element={<ClientDetails />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;