// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { getToken } from '../utils/JWT_Token';
// import { FaSpinner } from 'react-icons/fa';

// const ApproveLeave = () => {
//     const [leaveRequests, setLeaveRequests] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchLeaveRequests();
//     }, []);

//     const fetchLeaveRequests = async () => {
//         setIsLoading(true);
//         try {
//             const token = getToken();
//             const response = await axios.get('http://localhost:2022/leaveRequests/findpendingleaves', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setLeaveRequests(response.data);
//         } catch (error) {
//             setError('Failed to fetch leave requests.');
//             console.error('Error fetching leave requests:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleApprove = async (empnumber) => {
//         setIsLoading(true);
//         try {
//             const token = getToken();
//             await axios.post(
//                 `http://localhost:2022/leaveRequests/approveLeave?empnumber=${empnumber}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             alert('Leave approved successfully!');
//             fetchLeaveRequests(); // Refresh the leave requests
//         } catch (error) {
//             setError('Failed to approve leave.');
//             console.error('Error approving leave:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Container>
//             <h2>Approve Leave Requests</h2>
//             {isLoading && <Spinner><FaSpinner icon="spinner" /></Spinner>}
//             {error && <ErrorMessage>{error}</ErrorMessage>}
//             <Table>
//                 <thead>
//                     <tr>
//                         <th>Employee Name</th>
//                         <th>Leave Type</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {leaveRequests.map(request => (
//                         <tr key={request.id}>
//                             <td>{request.employeeName}</td>
//                             <td>{request.leaveType}</td>
//                             <td>{request.startDate}</td>
//                             <td>{request.endDate}</td>
//                             <td>{request.status}</td>
//                             <td>
//                                 <Button onClick={() => handleApprove(request.empnumber)}>Approve</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 20px;
//     background-color: #f9f9f9;
// `;

// const Spinner = styled.div`
//     margin: 20px 0;
//     font-size: 24px;
// `;

// const ErrorMessage = styled.div`
//     color: red;
//     margin: 20px 0;
// `;

// const Table = styled.table`
//     width: 100%;
//     border-collapse: collapse;
//     margin: 20px 0;

//     th, td {
//         border: 1px solid #ccc;
//         padding: 10px;
//         text-align: left;
//     }

//     th {
//         background-color: #f1f1f1;
//     }
// `;

// const Button = styled.button`
//     padding: 10px 20px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;

//     &:hover {
//         background-color: #0056b3;
//     }
// `;

// export default ApproveLeave;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from '../utils/JWT_Token';
import { FaSpinner } from 'react-icons/fa';

const ApproveLeave = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        setIsLoading(true);
        try {
            const token = getToken();
            const response = await axios.get('http://localhost:2022/leaveRequests', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLeaveRequests(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            setError('Failed to fetch leave requests.');
            console.error('Error fetching leave requests:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (empnumber) => {
        setIsLoading(true);
        try {
            const token = getToken();
            await axios.post(
                `http://localhost:2022/leaveRequests/approveLeave?empnumber=${empnumber}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Leave approved successfully!');
            fetchLeaveRequests(); // Refresh the leave requests
        } catch (error) {
            setError('Failed to approve leave.');
            console.error('Error approving leave:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <h2>Approve Leave Requests</h2>
            {isLoading && <Spinner><FaSpinner icon="spinner" /></Spinner>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.length > 0 ? (
                        leaveRequests.map(request => (
                            <tr key={request.id}>
                                <td>{request.employeeName}</td>
                                <td>{request.leaveType}</td>
                                <td>{request.startDate}</td>
                                <td>{request.endDate}</td>
                                <td>{request.status}</td>
                                <td>
                                    <Button onClick={() => handleApprove(request.empnumber)}>Approve</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No leave requests found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
`;

const Spinner = styled.div`
    margin: 20px 0;
    font-size: 24px;
`;

const ErrorMessage = styled.div`
    color: red;
    margin: 20px 0;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;

    th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
    }

    th {
        background-color: #f1f1f1;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export default ApproveLeave;
