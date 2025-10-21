import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainlayout from "./Layout/Mianlayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          {/* Nested routes rendered inside <Outlet /> */}

          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
