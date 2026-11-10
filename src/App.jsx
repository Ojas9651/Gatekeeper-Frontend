
import Login from "./Login";
import AddOrganization from "./PlatformAdmin/AddOrganization";
import ChangeStatus from "./PlatformAdmin/ChangeStatus";
import Dashboard from "./PlatformAdmin/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){

  return(
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/platform-admin/dashboard" element={<Dashboard />} />
                <Route path="/platform-admin/create" element={<AddOrganization />} />
                <Route path="/platform-admin/change-status" element={<ChangeStatus />} />
            </Routes>
        </BrowserRouter> 
    </>
    
  )
}

export default App;