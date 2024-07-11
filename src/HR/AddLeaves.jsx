import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { getToken } from '../utils/JWT_Token';
import Leave from '../components/LeaveCategory/Leave';

const AddLeavesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 20px;
  font-weight: bold;
`;

const AddLeaves = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [empNumber, setEmpNumber] = useState('');
  const [sickDays, setSickDays] = useState('');
  const [casualDays, setCasualDays] = useState('');
  const [unpaidDays, setUnpaidDays] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const leaveData = [
        { employeeName, empnumber: parseInt(empNumber, 10), leaveType: 'Sick', availableDays: parseInt(sickDays, 10) },
        { employeeName, empnumber: parseInt(empNumber, 10), leaveType: 'Casual', availableDays: parseInt(casualDays, 10) },
        { employeeName, empnumber: parseInt(empNumber, 10), leaveType: 'Unpaid', availableDays: parseInt(unpaidDays, 10) },
      ];
  
      const response = await axios.post(
        'http://localhost:2022/leaveBalance/addleaves',
        leaveData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Leaves added successfully:', response.data);
      setSuccessMessage('Leaves added successfully!');
      setEmployeeName('');
      setEmpNumber('');
      setSickDays('');
      setCasualDays('');
      setUnpaidDays('');
      // Handle successful leave addition
    } catch (error) {
      console.error('Error adding leaves:', error);
      // Handle error in adding leaves
    }
  };
  

  return (
    <AddLeavesContainer>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="employeeName">Employee Name</Label>
        <Input
          type="text"
          id="employeeName"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
        <Label htmlFor="empNumber">Employee Number</Label>
        <Input
          type="number"
          id="empNumber"
          value={empNumber}
          onChange={(e) => setEmpNumber(e.target.value)}
          required
        />
        <Label htmlFor="sickDays">Sick Leave Days</Label>
        <Input
          type="number"
          id="sickDays"
          value={sickDays}
          onChange={(e) => setSickDays(e.target.value)}
          required
        />
        <Label htmlFor="casualDays">Casual Leave Days</Label>
        <Input
          type="number"
          id="casualDays"
          value={casualDays}
          onChange={(e) => setCasualDays(e.target.value)}
          required
        />
        <Label htmlFor="unpaidDays">Unpaid Leave Days</Label>
        <Input
          type="number"
          id="unpaidDays"
          value={unpaidDays}
          onChange={(e) => setUnpaidDays(e.target.value)}
          required
        />
        <Button type="submit">Add Leaves</Button>
      </Form>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {/* <Leave empnumber={empNumber} />  */}
    </AddLeavesContainer>
  );
};

export default AddLeaves;




// import React, { useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { getToken } from '../../utils/JWT_Token';
// import Leave from '../LeaveCategory/Leave';

// const AddLeavesContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f0f0f0;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Label = styled.label`
//   margin-bottom: 10px;
//   font-weight: bold;
// `;

// const Input = styled.input`
//   margin-bottom: 20px;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   background-color: #007bff;
//   color: white;
//   font-weight: bold;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const SuccessMessage = styled.p`
//   color: green;
//   margin-top: 20px;
//   font-weight: bold;
// `;

// const AddLeaves = () => {
//   const [employeeName, setEmployeeName] = useState('');
//   const [empNumber, setEmpNumber] = useState('');
//   const [sickDays, setSickDays] = useState('');
//   const [casualDays, setCasualDays] = useState('');
//   const [unpaidDays, setUnpaidDays] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = getToken();
//     try {
//       const leaveData = [
//         { employeeName, empnumber: parseInt(empNumber, 10), leaveType: 'Sick', availableDays: parseInt(sickDays, 10) },
//         { employeeName, empnumber: parseInt(empNumber, 10), leaveType: 'Casual', availableDays: parseInt(casualDays, 10) },
//         { employeeName, empnumber: parseInt(empNumber, 10), leaveType: 'Unpaid', availableDays: parseInt(unpaidDays, 10) },
//       ];
  
//       const response = await axios.post(
//         'http://localhost:2022/leaveBalance/addleaves',
//         leaveData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log('Leaves added successfully:', response.data);
//       setSuccessMessage('Leaves added successfully!');
//       setSickDays('');
//       setCasualDays('');
//       setUnpaidDays('');
//       // Handle successful leave addition
//     } catch (error) {
//       console.error('Error adding leaves:', error);
//       // Handle error in adding leaves
//     }
//   };
  

//   return (
//     <AddLeavesContainer>
//       <Form onSubmit={handleSubmit}>
//         <Label htmlFor="employeeName">Employee Name</Label>
//         <Input
//           type="text"
//           id="employeeName"
//           value={employeeName}
//           onChange={(e) => setEmployeeName(e.target.value)}
//           required
//         />
//         <Label htmlFor="empNumber">Employee Number</Label>
//         <Input
//           type="number"
//           id="empNumber"
//           value={empNumber}
//           onChange={(e) => setEmpNumber(e.target.value)}
//           required
//         />
//         <Label htmlFor="sickDays">Sick Leave Days</Label>
//         <Input
//           type="number"
//           id="sickDays"
//           value={sickDays}
//           onChange={(e) => setSickDays(e.target.value)}
//           required
//         />
//         <Label htmlFor="casualDays">Casual Leave Days</Label>
//         <Input
//           type="number"
//           id="casualDays"
//           value={casualDays}
//           onChange={(e) => setCasualDays(e.target.value)}
//           required
//         />
//         <Label htmlFor="unpaidDays">Unpaid Leave Days</Label>
//         <Input
//           type="number"
//           id="unpaidDays"
//           value={unpaidDays}
//           onChange={(e) => setUnpaidDays(e.target.value)}
//           required
//         />
//         <Button type="submit">Add Leaves</Button>
//       </Form>
//       {successMessage && (
//         <>
//           <SuccessMessage>{successMessage}</SuccessMessage>
//           <Leave empnumber={empNumber} /> {/* Pass empNumber to Leave component */}
//         </>
//       )}
//     </AddLeavesContainer>
//   );
// };

// export default AddLeaves;
