import React from 'react';
import { useAuth } from '../Context/AuthContext';
import AttendanceLogIn from '../components/Attandance/AttendanceLogIn';
import GetAnnouncement from '../components/Announcement/GetAnnouncement';
import AddComplaints from '../components/complaints/AddComplaints';
import AllComplaints from '../components/complaints/AllComplaints';
import UserWFH_Request from '../components/workfromHome/UserWFH_Request';
import ApproveWFH_HR from '../components/workfromHome/ApproveWFH_HR';
import ApplyLeave from '../components/LeaveCategory/ApplyLeave';
import ApproveLeave from '../HR/ApproveLeave';
import GetIP from '../Admin/GetIP';

const Home = () => {
  const { user } = useAuth();

  return (
<div className="container">
  <div className="row">
  <div className="col-md-6">
  {user.role !== 'Employee' &&  <ApproveWFH_HR />}
  {user.role !== 'Admin' &&  <ApplyLeave />}
  {user.role!=='Employee' && <ApproveLeave />} 
  {user.role=='Admin' && <GetIP />} 
  </div>
    <div className="col-md-6">
    {user.role !== 'Admin' && <AttendanceLogIn />}
      <GetAnnouncement />
      {user.role !== 'Admin' && <AddComplaints />}
      {user.role == 'Admin' && <AllComplaints />}
      {user.role !== 'Admin' &&  <UserWFH_Request />}
     
    </div>
  </div>
</div>


  );
};

export default Home;
