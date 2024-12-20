import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './services/Login';
import AuthCallback from './services/AuthCallback';
import Dashboard from './services/Dashboard';
import MainPagePatient from './pages/Patient/MainPagePatient';

import AdminPage from './pages/Admin/AdminPage';
import AdminSchedule from './pages/Admin/AdminSchedule/AdminSchedule'
import AdminStaff from './pages/Admin/AdminStaff/AdminStaff';
import CreateStaff from './pages/Admin/AdminStaff/CreateStaff';
import UpdateStaff from './pages/Admin/AdminStaff/UpdateStaff';
import AdminPatient from './pages/Admin/AdminPatient/AdminPatient';
import CreatePatient from './pages/Admin/AdminPatient/AdminPatientCreate'; 
import UpdatePatient from './pages/Admin/AdminPatient/AdminPatientUpdate';

import AdminOpType from './pages/Admin/AdminOpType/AdminOpType';
import CreateOpType from './pages/Admin/AdminOpType/CreateOpType';
import Patient from './pages/Patient/Patient';
import PatientUpdate from './pages/Patient/PatientUpdate';
import PatientDelete from './pages/Patient/PatientDelete';

import MainPageStaff from './pages/Staff/MainPageStaff';
import OperationRequest from './pages/Staff/OperationRequest';
import OperationRequestCreate from './pages/Staff/OperationRequestCreate';
import OperationRequestUpdate from './pages/Staff/OperationRequestUpdate';
import OperationRequestDelete from './pages/Staff/OperationRequestDelete';
import DeleteOpType from './pages/Admin/AdminOpType/DeleteOpType';
import UpdateOpType from './pages/Admin/AdminOpType/UpdateOpType';
import SurgeryRoom3D from './pages/Staff/SurgeryRoom3D';



// A component to check the user's role and grant or deny access to certain routes
interface ProtectedRouteProps {
    allowedRoles: string[];
    redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, redirectPath }) => {
    const userRole = localStorage.getItem('userRole');

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

const App: React.FC = () => {

    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');

    console.log("User role:", userRole);
    console.log("User email:", userEmail);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/dashboard" element={<Dashboard />} />



                {/* Admin routes protected for 'Admin' role only */}
                /*<Route element={<ProtectedRoute allowedRoles={['Admin']} redirectPath="/login" />}> *
                <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/patient" element={<AdminPatient />} />
                        <Route path="/admin/schedule" element={<AdminSchedule />} />
                        <Route path="/admin/patient/create" element={<CreatePatient />} /> 
                        <Route path="/admin/patient/update/:phoneNumber" element={<UpdatePatient />} />
                        <Route path="/admin/staff" element={<AdminStaff />} />
                        <Route path="/admin/staff/create" element={<CreateStaff />} />
                        <Route path="/admin/staff/update/:staffId" element={<UpdateStaff />} /> 
                        <Route path="/admin/opTypes" element={<AdminOpType />} />
                        <Route path="/admin/opTypes/create" element={<CreateOpType />} />
                        <Route path="/admin/opTypes/update/:operationTypeId" element={<UpdateOpType />} />
                        <Route path="/admin/opTypes/delete/:operationTypeName" element={<DeleteOpType />} />


                </Route>

                 {/* Admin routes protected for 'Staff' role only */}
                 <Route element={<ProtectedRoute allowedRoles={['Doctor','Nurse']} redirectPath="/mainPageStaff" />}>
                    <Route path="/mainPageStaff" element={<MainPageStaff />} />
                    <Route path="/operationRequest" element={<OperationRequest />} />
                    <Route path="/operationRequest/create" element={<OperationRequestCreate />} />
                    <Route path="/operationRequest/update/:id" element={<OperationRequestUpdate />} />
                    <Route path="/operationRequest/delete/:id" element={<OperationRequestDelete />} />
                    <Route path='/surgeryRoom3DModel' element={<SurgeryRoom3D/>} />

                </Route>

                {/* Patient route protected for 'Patient' role only */}
                <Route element={<ProtectedRoute allowedRoles={['Patient']} redirectPath="/mainPagePatient" />}>
                    <Route path="/mainPagePatient" element={<MainPagePatient />} />
                    <Route path="/patient" element={<Patient />} />
                    <Route path="/patient/update" element={<PatientUpdate/>} />
                    <Route path="/patient/delete" element={<PatientDelete/>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;