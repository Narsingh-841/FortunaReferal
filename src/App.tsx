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
import Support from "./Support/Support.tsx";
import ClientStaffPage from "./ClientStaffPage/ClientStaffPage.tsx";
import ProfilePage from "./Profile/ProfilePage.tsx";
import Settings from "./Settings/Settings.tsx";
import MyServicesSidebar from "./MyServices/MyServicesSidebar.tsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          {/* Regular dashboard routes */}
          <Route path="/dashboard" element={<ServicesDashboard />} />
          <Route path="/my-referrals" element={<ReferralTable />} />
          <Route path="/my-referrals/new" element={<AddNewReferralPage />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/uploads" element={<FilesPage/>} />
          <Route path="/calendar" element={<CalendarPage/>} />
          <Route path="/client/:clientName" element={<ClientDetails />} />
          <Route path="/support" element={<Support />} />
          <Route path="/new-client" element={<ClientStaffPage />} />
          <Route path="/Profile-Page" element={<ProfilePage/>} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Services routes - rendered in same layout */}
          <Route path="/services/*" element={<MyServicesSidebar/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;