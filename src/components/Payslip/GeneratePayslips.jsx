import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { getToken } from '../../utils/JWT_Token';

// Styled components for layout and styling
const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  text-align: left;
  font-weight: bold;
`;

const Td = styled.td`
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 0.5rem;
  background-color: ${({ bgColor }) => bgColor || '#3182ce'};
  color: #fff;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const FormField = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr; /* Adjust column widths as needed */
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
  }

  input[type='text'],
  input[type='email'],
  input[type='date'] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    font-size: 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const GeneratePayslips = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    uan: '',
    pan: '',
    designation: '',
    department: '',
    bankName: '',
    bankAccountNumber: '',
    joiningDate: '',
    basicSalary: '',
    hra: '',
    conveyanceAllowance: '',
    medicalAllowance: '',
    otherAllowance: '',
    healthInsurance: '',
    professionalTax: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const token = getToken();

    axios.get('http://localhost:2022/payroll/getall', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setPayrollData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the payroll data!', error);
        setIsLoading(false);
      });
  }, []);

  // Set the app root element for accessibility
  useEffect(() => {
    ReactModal.setAppElement('#root');
  }, []);

  const openModal = (employee, mode = 'view') => {
    const formattedDate = employee.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '';
    setSelectedEmployee(employee);
    setFormData({
      ...employee,
      joiningDate: formattedDate
    });
    setEditMode(mode === 'edit');
    setModalIsOpen(true);
    setEditSuccess(false);
    setEditError('');
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setModalIsOpen(false);
    setFormData({
      id: '',
      name: '',
      email: '',
      uan: '',
      pan: '',
      designation: '',
      department: '',
      bankName: '',
      bankAccountNumber: '',
      joiningDate: '',
      basicSalary: '',
      hra: '',
      conveyanceAllowance: '',
      medicalAllowance: '',
      otherAllowance: '',
      healthInsurance: '',
      professionalTax: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const token = getToken();

    axios.put(`http://localhost:2022/payroll/put${selectedEmployee.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // Update local state or fetch updated data
        console.log('Employee updated successfully!', response.data);
        setEditSuccess(true);
        closeModal();
      })
      .catch(error => {
        console.error('Error updating employee!', error);
        setEditError('Error updating employee. Please try again.');
      });
  };

  const generateAllPayslips = () => {
    const token = getToken();
  
    axios.post('http://localhost:2022/payroll/generate-payslips', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('All payslips generated successfully!', response.data);
        // Handle success response
      })
      .catch(error => {
        console.error('Error generating all payslips!', error);
        // Handle error response
      });
  };

  const generatePayslip = (employeeId) => {
    const token = getToken();
  
    axios.post(`http://localhost:2022/payroll/generate-payslip/${employeeId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    })
      .then(response => {
        console.log('Payslip generated successfully!', response.data);
        // Handle success response
      })
      .catch(error => {
        console.error('Error generating payslip!', error);
        // Handle error response
      });
  };

  return (
    <Container>
      <Title>Generate PaySlip</Title>
      <ButtonContainer>
        <Button onClick={generateAllPayslips} bgColor="#3182ce">Generate All Payslip</Button>
      </ButtonContainer>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Amount</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map(employee => (
              <tr key={employee.id}>
                <Td>{employee.id}</Td>
                <Td>{employee.name}</Td>
                <Td>{employee.basicSalary}</Td>
                <Td>
                  <Button onClick={() => openModal(employee, 'view')} bgColor="#3182ce">View</Button>
                  <Button onClick={() => openModal(employee, 'edit')} bgColor="#f6ad55">Edit</Button>
                  <Button onClick={() => generatePayslip(employee.id)} bgColor="#48bb78">Generate Payslip</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Details"
        aria={{
          labelledby: "modal-title",
          describedby: "modal-body"
        }}
      >
        {selectedEmployee && (
          <ModalContent>
            <h2 id="modal-title" className="text-lg font-bold mb-2">{selectedEmployee.name}'s Details</h2>
            <form onSubmit={handleEdit}>
              <GridContainer>
                <div>
                  <FormField>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="uan">UAN</label>
                    <input type="text" id="uan" name="uan" value={formData.uan} onChange={handleChange} placeholder="Enter UAN" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="pan">PAN</label>
                    <input type="text" id="pan" name="pan" value={formData.pan} onChange={handleChange} placeholder="Enter PAN" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="designation">Designation</label>
                    <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} placeholder="Enter designation" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="department">Department</label>
                    <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} placeholder="Enter department" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="bankName">Bank Name</label>
                    <input type="text" id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Enter bank name" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="bankAccountNumber">Bank Account Number</label>
                    <input type="text" id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} placeholder="Enter bank account number" disabled={!editMode} />
                  </FormField>
                </div>
                <div>
                  <FormField>
                    <label htmlFor="joiningDate">Joining Date</label>
                    <input type="date" id="joiningDate" name="joiningDate" value={formData.joiningDate} onChange={handleChange} disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="basicSalary">Basic Salary</label>
                    <input type="text" id="basicSalary" name="basicSalary" value={formData.basicSalary} onChange={handleChange} placeholder="Enter basic salary" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="hra">HRA</label>
                    <input type="text" id="hra" name="hra" value={formData.hra} onChange={handleChange} placeholder="Enter HRA" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="conveyanceAllowance">Conveyance Allowance</label>
                    <input type="text" id="conveyanceAllowance" name="conveyanceAllowance" value={formData.conveyanceAllowance} onChange={handleChange} placeholder="Enter conveyance allowance" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="medicalAllowance">Medical Allowance</label>
                    <input type="text" id="medicalAllowance" name="medicalAllowance" value={formData.medicalAllowance} onChange={handleChange} placeholder="Enter medical allowance" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="otherAllowance">Other Allowance</label>
                    <input type="text" id="otherAllowance" name="otherAllowance" value={formData.otherAllowance} onChange={handleChange} placeholder="Enter other allowance" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="healthInsurance">Health Insurance</label>
                    <input type="text" id="healthInsurance" name="healthInsurance" value={formData.healthInsurance} onChange={handleChange} placeholder="Enter health insurance" disabled={!editMode} />
                  </FormField>
                  <FormField>
                    <label htmlFor="professionalTax">Professional Tax</label>
                    <input type="text" id="professionalTax" name="professionalTax" value={formData.professionalTax} onChange={handleChange} placeholder="Enter professional tax" disabled={!editMode} />
                  </FormField>
                </div>
              </GridContainer>
              {editMode && (
                <ButtonContainer>
                  <Button type="submit" bgColor="#48bb78">Save</Button>
                </ButtonContainer>
              )}
            </form>
            {editSuccess && <p className="text-green-500">Employee details updated successfully!</p>}
            {editError && <p className="text-red-500">{editError}</p>}
            <ButtonContainer>
              <Button onClick={closeModal} bgColor="#e53e3e">Close</Button>
            </ButtonContainer>
          </ModalContent>
        )}
      </ReactModal>
    </Container>
  );
};

export default GeneratePayslips;
