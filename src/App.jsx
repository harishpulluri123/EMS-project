import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserLogin from './components/LoginModule/UserLogin';
import Home from './pages/Home';
import Navbar from './components/Navigation/Navbar';
import { AuthProvider, useAuth } from './Context/AuthContext';
import HrRegister from './Admin/HrRegister';
import Hr from './HR/Hr';
import EmployeeRegister from './HR/EmployeeRegister';
import AddLeaves from './HR/AddLeaves';
import UserEducationDetailsAll from './HR/UserEducationDetailsAll';
import AddEmpBankDetails from './HR/AddEmpBankDetails';
import GetUserBankDetails from './HR/GetUserBankDetails';
import GetAll_AttendanceLogin from './components/Attandance/GetAll_AttendanceLogin';
import AddAnnouncement from './components/Announcement/AddAnnouncement';
import ChangePassword from './components/LoginModule/ChangePassword';
import UserOtpLogin from './components/LoginModule/UserOtpLogin';
import Leave from './components/LeaveCategory/Leave';
import MyProfile from './components/Profile/MyProfile';
import AddEducation from './Employee/AddEducation';
import UploadDocument from './Employee/UploadDocument';
import AllUser from './Employee/AllUser';
import DownloadDoc from './HR/DownloadDoc';
import CreatePaySlip from './components/Payslip/CreatePaySlip';
import GeneratePayslips from './components/Payslip/GeneratePayslips';



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthContent />
      </Router>
    </AuthProvider>
  );
};

const AuthContent = () => {
  const { user } = useAuth();

  if (!user) {
    // User is not logged in, render login routes
    return (
      <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/login/otp' element={<UserOtpLogin />} > </Route>

        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // User is logged in, render authenticated content
  return (
    <>
      <Navbar />
      {/* Render other authenticated content */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/hr-register' element={<HrRegister />} />
        <Route path='/admin/ch-password' element={<ChangePassword />} />
        <Route path='/hr' element={<Hr />} />
        <Route path='/hr/add-emp' element={<EmployeeRegister />} />
        <Route path='/hr/add-leaves' element={<AddLeaves />} />
        <Route path='/hr/edu-details' element={<UserEducationDetailsAll />} />
        <Route path='/hr/add/bank-details' element={<AddEmpBankDetails />} />
        <Route path='/hr/user/bank-details' element={<GetUserBankDetails />} />
        <Route path='/all/attendance/login' element={<GetAll_AttendanceLogin />} />
        <Route path='/all/announcement' element={<AddAnnouncement />} />
        <Route path='/emp/leaves' element={<Leave />} />
        <Route path='/user/profile' element={<MyProfile />} />
        <Route path='/emp/add-edu' element={<AddEducation />} />
        <Route path='/emp/add-doc' element={<UploadDocument/>} />
        <Route path= '/all-user' element={<AllUser />} />
        <Route path='/emp/doc' element={<DownloadDoc />} />
        <Route path='/hr/create/payslip' element={<CreatePaySlip />} />
        <Route path='/hr/generate/payslip' element={<GeneratePayslips />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
};

export default App;
