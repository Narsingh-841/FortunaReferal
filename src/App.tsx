import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ServicesDashboard from "./ServiceDashboard/ServicesDashboard";
import Mainlayout from "./Layout/Mainlayout.tsx";
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
import ActivityLog from "./ActivityLog/ActivityLog.tsx";
import AccountingPage from "./ServiceDetailsPage/Accounting/Accounting.tsx";
import BusinessAdvisory from "./ServiceDetailsPage/BusinessAdvisory/BusinessAdvisory.tsx";
import Finance from "./ServiceDetailsPage/Finance/finance.tsx";
import Insurance from "./ServiceDetailsPage/Insurance/Insurance.tsx";
import IT from "./ServiceDetailsPage/IT/IT.tsx";
import Legal from "./ServiceDetailsPage/Legal/Legal.tsx";
import PersonalDetailsForm from "./PersonalDetailsForm/PersonalDetailsForm.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          {/* Redirect root to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Regular dashboard routes */}
          <Route path="/dashboard" element={<ServicesDashboard />} />
          <Route path="/my-referrals" element={<ReferralTable />} />
          <Route path="/my-referrals/new" element={<AddNewReferralPage />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/uploads" element={<FilesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/client/:clientName" element={<ClientDetails />} />
          <Route path="/support" element={<Support />} />
          <Route path="/new-client" element={<ClientStaffPage />} />
          <Route path="/Profile-Page" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />

          {/* Services routes */}
          <Route path="/services/accounting" element={<AccountingPage />} />
          <Route path="/services/business-advisory" element={<BusinessAdvisory />} />
          <Route path="/services/finance" element={<Finance />} />
          <Route path="/services/insurance" element={<Insurance />} />
          <Route path="/services/it" element={<IT />} />
          <Route path="/services/legal" element={<Legal />} />

          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/new-service" element={<PersonalDetailsForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
