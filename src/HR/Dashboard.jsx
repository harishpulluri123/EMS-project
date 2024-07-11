import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
 import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Dashboard = () => {
    const totalEmployees = 100;
    const registeredEmployees = 60;
    const notInvitedEmployees = 20;
    const yetToRegisterEmployees = 20;

    return (
        <Wrapper>
            <div className="container">
                <div className="row ">
                    <div className="col-md-5">
                        <EmployeeCard
                            total={totalEmployees}
                            registered={registeredEmployees}
                            notInvited={notInvitedEmployees}
                            yetToRegister={yetToRegisterEmployees}
                        />
                    </div>
                    <div className="col-md-7">
                        <PendingActions
                            pendingActions={10}
                            expenses={0}
                            probations={5}
                            joinTasks={15}
                            exitTasks={8}
                            profileChanges={3}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <div className="card">
                            <div>QuickLinks</div>
                            <Link to="/hr/add-emp" className="link">+ Add Employee</Link>
                            {/* <Link to="/all/users" className="link">+ All Employee</Link> */}
                            <Link to="/hr/add-leaves" className="link">+ Add Leaves(HR)</Link>
                            {/* <Link to="/emp/education-form" className="link">+ Add Education Details(EMP)</Link> */}
                            <Link to="/hr/edu-details" className="link">+UserEducationDetails(HR)</Link>
                            <Link to="/hr/add/bank-details" className="link">+ Add BankDetails(HR)</Link>
                            <Link to="/hr/user/bank-details" className="link">+ Get User Bank Details(HR)</Link>
                            <Link to="/emp/doc" className="link">+ Get EmpDocument</Link>
                            <Link to="/hr/create/payslip" className="link">+ Create PaySlip</Link>
                            <Link to="/hr/generate/payslip" className="link">+Generate Payslip</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const EmployeeCard = ({ total, registered, notInvited, yetToRegister }) => {
    return (
        <CardWrapper className="card">
            <div className="card-body">
                <h5 className="card-title">Employees</h5>
                <p className="card-text">Total headcount: {total}</p>
                <p className="card-text">Registered: {registered}</p>
                <p className="card-text">Not Invited: {notInvited}</p>
                <p className="card-text">Yet to Register: {yetToRegister}</p>
            </div>
        </CardWrapper>
    );
};

const PendingActions = ({
    expenses,
    probations,
    joinTasks,
    exitTasks,
    profileChanges,
}) => {
    return (
        <CardWrapper className="card">
            <div className="card-body">
                <h5 className="card-title">Pending Actions</h5>
                <p className="card-text">Expenses: {expenses}</p>
                <p className="card-text">Probations: {probations}</p>
                <p className="card-text">Join Tasks: {joinTasks}</p>
                <p className="card-text">Exit Tasks: {exitTasks}</p>
                <p className="card-text">Profile Changes: {profileChanges}</p>
            </div>
        </CardWrapper>
    );
};

const Wrapper = styled.section`
*{
    margin-right: 0px;
    position:relative;
}
`;

const CardWrapper = styled.div`
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


  .card-body {
    padding: 20px;
    
    
  }

  .card-title {
    font-size: 1.25rem;
    margin-bottom: 15px;
  }

  .card-text {
    margin: 5px 0;
  }

  .link {
    text-decoration: none;
  }
`;

export default Dashboard;
