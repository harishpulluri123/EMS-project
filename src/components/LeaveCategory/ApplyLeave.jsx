// import React, { useState, useEffect } from 'react';
// import styled, { css } from 'styled-components';
// import axios from 'axios';
// import { getToken } from '../../utils/JWT_Token';
// import { FaSpinner } from 'react-icons/fa';
// import dayjs from 'dayjs';

// const ApplyLeave = () => {
//     const initialLeaveData = {
//         employeeName: sessionStorage.getItem('firstname'),
//         empnumber: sessionStorage.getItem('empNumber'),
//         employeeEmail: sessionStorage.getItem('email'),
//         startDate: '',
//         endDate: '',
//         status: 'pending',
//         leaveType: 'Sick'
//     };

//     const [leaveData, setLeaveData] = useState(initialLeaveData);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [leaveDays, setLeaveDays] = useState(0);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [availableLeaves, setAvailableLeaves] = useState({
//         Sick: 0,
//         Casual: 0,
//         Unpaid: 0
//     });

//     useEffect(() => {
//         // Fetch available leave counts when component mounts
//         fetchAvailableLeaves();
//     }, []);

//     useEffect(() => {
//         if (leaveData.startDate && leaveData.endDate) {
//             const start = dayjs(leaveData.startDate);
//             const end = dayjs(leaveData.endDate);
//             const diff = end.diff(start, 'day') + 1; // +1 to include both start and end dates
//             setLeaveDays(diff);
//         } else {
//             setLeaveDays(0);
//         }
//     }, [leaveData.startDate, leaveData.endDate]);

//     const fetchAvailableLeaves = async () => {
//         try {
//             const empnumber = sessionStorage.getItem('empNumber');
//             const token = getToken();
//             const response = await axios.get(`http://localhost:2022/leaveBalance/availableLeaves?empnumber=${empnumber}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const availableLeavesData = response.data.leaveBalance;
//             const parsedLeaveData = {
//                 Sick: 0,
//                 Casual: 0,
//                 Unpaid: 0
//             };

//             availableLeavesData.forEach(leave => {
//                 if (leave.leaveType === 'Sick') {
//                     parsedLeaveData.Sick = leave.availableDays;
//                 } else if (leave.leaveType === 'Casual') {
//                     parsedLeaveData.Casual = leave.availableDays;
//                 } else if (leave.leaveType === 'Unpaid') {
//                     parsedLeaveData.Unpaid = leave.availableDays;
//                 }
//             });

//             setAvailableLeaves(parsedLeaveData);
//         } catch (error) {
//             console.error('Error fetching available leaves:', error);
//         }
//     };

//     const handleChange = (e) => {
//         setLeaveData({
//             ...leaveData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setErrorMessage(''); // Clear previous error message

//         try {
//             const token = getToken();
//             const response = await axios.post(
//                 'http://localhost:2022/leaveRequests/applyLeave',
//                 [{ ...leaveData, status: 'pending' }],
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             alert('Leave applied successfully!');
//             setLeaveData(initialLeaveData); // Reset the form
//             setShowForm(false); // Hide the form after submission
//             fetchAvailableLeaves(); // Fetch updated available leaves
//         } catch (error) {
//             console.error('Error applying leave:', error);
//             if (error.response && error.response.data) {
//                 setErrorMessage(error.response.data.message || 'Failed to apply leave.');
//             } else {
//                 setErrorMessage('Failed to apply leave.');
//             }
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Container>
//             <FormWrapper>
//                 {!showForm && (
//                     <ApplyButton onClick={() => setShowForm(true)}>
//                         Apply for Leave
//                     </ApplyButton>
//                 )}
//                 <Form showForm={showForm} onSubmit={handleSubmit}>
//                     <h2>Leave Request</h2>
//                     <Label htmlFor="startDate">Start Date</Label>
//                     <Input
//                         type="date"
//                         name="startDate"
//                         value={leaveData.startDate}
//                         onChange={handleChange}
//                         required
//                     />
//                     <Label htmlFor="endDate">End Date</Label>
//                     <Input
//                         type="date"
//                         name="endDate"
//                         value={leaveData.endDate}
//                         onChange={handleChange}
//                         required
//                     />
//                     <Label htmlFor="leaveType">Leave Type</Label>
//                     <Select
//                         name="leaveType"
//                         value={leaveData.leaveType}
//                         onChange={handleChange}
//                     >
//                         <option value="Sick">Sick</option>
//                         <option value="Casual">Casual</option>
//                         <option value="Unpaid">Unpaid Leave</option>
//                     </Select>
//                     <Button type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? <FaSpinner icon="spinner" /> : 'Apply Leave'}
//                     </Button>
//                     {leaveDays > 0 && <DaysCount>{`Total Leave Days: ${leaveDays}`}</DaysCount>}
//                     {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
//                     {leaveData.leaveType && (
//                         <AvailableLeaves>
//                             Available {leaveData.leaveType} Leaves: <span>{availableLeaves[leaveData.leaveType]}</span>
//                         </AvailableLeaves>
//                     )}
//                 </Form>
//             </FormWrapper>
//         </Container>
//     );
// };

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 10px;
// `;

// const FormWrapper = styled.div`
//   width: 100%;
//   max-width: 400px;
//   padding: 20px;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
//   text-align: center;
// `;

// const ApplyButton = styled.button`
//   padding: 15px 20px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 18px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 15px;
//   overflow: hidden;
//   height: 0;
//   transition: height 0.5s ease, opacity 0.5s ease;
//   opacity: 0;

//   ${({ showForm }) =>
//     showForm &&
//     css`
//       height: auto;
//       opacity: 1;
//     `}
// `;

// const Label = styled.label`
//   width: 100%;
//   text-align: left;
//   font-weight: bold;
//   margin-top: 10px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:disabled {
//     background-color: #a0c4ff;
//     cursor: not-allowed;
//   }
// `;

// const DaysCount = styled.div`
//   margin: 10px 0;
//   font-size: 16px;
//   color: #333;
// `;

// const ErrorMessage = styled.div`
//   color: red;
//   margin-top: 10px;
// `;

// const AvailableLeaves = styled.div`
//   margin-top: 20px;
//   color: green;

//   span {
//     font-weight: bold;
//     margin-left: 5px;
//   }
// `;

// export default ApplyLeave;





import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { getToken } from '../../utils/JWT_Token';
import { FaSpinner } from 'react-icons/fa';
import dayjs from 'dayjs';

const ApplyLeave = () => {
    const initialLeaveData = {
        employeeName: sessionStorage.getItem('firstname'),
        empnumber: sessionStorage.getItem('empNumber'),
        employeeEmail: sessionStorage.getItem('email'),
        startDate: '',
        endDate: '',
        status: 'pending',
        leaveType: 'Sick'
    };

    const [leaveData, setLeaveData] = useState(initialLeaveData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [leaveDays, setLeaveDays] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [availableLeaves, setAvailableLeaves] = useState({
        Sick: 0,
        Casual: 0,
        Unpaid: 0
    });

    useEffect(() => {
        // Fetch available leave counts when component mounts
        fetchAvailableLeaves();
    }, []);

    useEffect(() => {
        if (leaveData.startDate && leaveData.endDate) {
            const start = dayjs(leaveData.startDate);
            const end = dayjs(leaveData.endDate);
            const diff = end.diff(start, 'day') + 1; // +1 to include both start and end dates
            setLeaveDays(diff);
        } else {
            setLeaveDays(0);
        }
    }, [leaveData.startDate, leaveData.endDate]);

    const fetchAvailableLeaves = async () => {
        try {
            const empnumber = sessionStorage.getItem('empNumber');
            const token = getToken();
            const response = await axios.get(`http://localhost:2022/leaveBalance/availableLeaves?empnumber=${empnumber}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const availableLeavesData = response.data.leaveBalance || [];
            const parsedLeaveData = {
                Sick: 0,
                Casual: 0,
                Unpaid: 0
            };

            availableLeavesData.forEach(leave => {
                if (leave.leaveType === 'Sick') {
                    parsedLeaveData.Sick = leave.availableDays;
                } else if (leave.leaveType === 'Casual') {
                    parsedLeaveData.Casual = leave.availableDays;
                } else if (leave.leaveType === 'Unpaid') {
                    parsedLeaveData.Unpaid = leave.availableDays;
                }
            });

            setAvailableLeaves(parsedLeaveData);
        } catch (error) {
            console.error('Error fetching available leaves:', error);
            setErrorMessage('Failed to fetch available leaves.');
        }
    };

    const handleChange = (e) => {
        setLeaveData({
            ...leaveData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(''); // Clear previous error message

        try {
            const token = getToken();
            await axios.post(
                'http://localhost:2022/leaveRequests/applyLeave',
                [{ ...leaveData, status: 'pending' }],
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Leave applied successfully!');
            setLeaveData(initialLeaveData); // Reset the form
            setShowForm(false); // Hide the form after submission
            fetchAvailableLeaves(); // Fetch updated available leaves
        } catch (error) {
            console.error('Error applying leave:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Failed to apply leave.');
            } else {
                setErrorMessage('Failed to apply leave.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <FormWrapper>
                {!showForm && (
                    <ApplyButton onClick={() => setShowForm(true)}>
                        Apply for Leave
                    </ApplyButton>
                )}
                <Form showForm={showForm} onSubmit={handleSubmit}>
                    <h2>Leave Request</h2>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                        type="date"
                        name="startDate"
                        value={leaveData.startDate}
                        onChange={handleChange}
                        required
                    />
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                        type="date"
                        name="endDate"
                        value={leaveData.endDate}
                        onChange={handleChange}
                        required
                    />
                    <Label htmlFor="leaveType">Leave Type</Label>
                    <Select
                        name="leaveType"
                        value={leaveData.leaveType}
                        onChange={handleChange}
                    >
                        <option value="Sick">Sick</option>
                        <option value="Casual">Casual</option>
                        <option value="Unpaid">Unpaid Leave</option>
                    </Select>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <FaSpinner icon="spinner" /> : 'Apply Leave'}
                    </Button>
                    {leaveDays > 0 && <DaysCount>{`Total Leave Days: ${leaveDays}`}</DaysCount>}
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    {leaveData.leaveType && (
                        <AvailableLeaves>
                            Available {leaveData.leaveType} Leaves: <span>{availableLeaves[leaveData.leaveType]}</span>
                        </AvailableLeaves>
                    )}
                </Form>
            </FormWrapper>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ApplyButton = styled.button`
  padding: 15px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  overflow: hidden;
  height: 0;
  transition: height 0.5s ease, opacity 0.5s ease;
  opacity: 0;

  ${({ showForm }) =>
    showForm &&
    css`
      height: auto;
      opacity: 1;
    `}
`;

const Label = styled.label`
  width: 100%;
  text-align: left;
  font-weight: bold;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #a0c4ff;
    cursor: not-allowed;
  }
`;

const DaysCount = styled.div`
  margin: 10px 0;
  font-size: 16px;
  color: #333;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const AvailableLeaves = styled.div`
  margin-top: 20px;
  color: green;

  span {
    font-weight: bold;
    margin-left: 5px;
  }
`;

export default ApplyLeave;
