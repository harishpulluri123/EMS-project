import React, { useState } from 'react';
import styled from 'styled-components';
import { getToken } from '../utils/JWT_Token';

const AddEducation = () => {
    const [formData, setFormData] = useState({
        empnumber: '',
        graduationcollegeOrInstitute: '',
        graduationUniversityOrBord: '',
        graduationpassedOutYear: '',
        graduationMarksOrCGPA: '',
        graduationBranch: '',
        graduationCity: '',
        intercollegeOrInstitute: '',
        interUniversityOrBord: '',
        interpassedOutYear: '',
        intermarksOrCGPA: '',
        interBranch: '',
        interCity: '',
        ssccollegeOrInstitute: '',
        sscuniversityOrBord: '',
        sscpassedOutYear: '',
        sscmarksOrCGPA: '',
        sscCity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            empnumber: parseInt(formData.empnumber),
            graduationcollegeOrInstitute: formData.graduationcollegeOrInstitute,
            graduationUniversityOrBord: formData.graduationUniversityOrBord,
            graduationpassedOutYear: parseInt(formData.graduationpassedOutYear),
            graduationMarksOrCGPA: parseFloat(formData.graduationMarksOrCGPA), // Parse as float
            graduationBranch: formData.graduationBranch,
            graduationCity: formData.graduationCity,
            intercollegeOrInstitute: formData.intercollegeOrInstitute,
            interUniversityOrBord: formData.interUniversityOrBord,
            interpassedOutYear: parseInt(formData.interpassedOutYear),
            intermarksOrCGPA: parseFloat(formData.intermarksOrCGPA), // Parse as float
            interBranch: formData.interBranch,
            interCity: formData.interCity,
            ssccollegeOrInstitute: formData.ssccollegeOrInstitute,
            sscuniversityOrBord: formData.sscuniversityOrBord,
            sscpassedOutYear: parseInt(formData.sscpassedOutYear),
            sscmarksOrCGPA: parseFloat(formData.sscmarksOrCGPA), // Parse as float
            sscCity: formData.sscCity
        };
        try {
            const token = getToken();
            console.log(token)
            const response = await fetch(`http://localhost:2022/educationaldetails/saveeducationaldetails`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(payload)
            });
    console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
    
            // Check if responseData is not empty before parsing
            if (responseData) {
                console.log('Data submitted successfully:', responseData);
            } else {
                console.warn('Received empty response from the server');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle specific error messages here, such as 403 Forbidden
            if (error.message.includes('403')) {
                // Display a message to the user indicating insufficient permissions
            }
        }
        
    };
    

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h2>Education Details Form</h2>
                <InputRow>
                    <InputWrapper>
                        <label>Employee Number:</label>
                        <input
                            type="number"
                            name="empnumber"
                            value={formData.empnumber}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <InputWrapper>
                        <label>Graduation College:</label>
                        <input
                            type="text"
                            name="graduationcollegeOrInstitute"
                            value={formData.graduationcollegeOrInstitute}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Graduation University:</label>
                        <input
                            type="text"
                            name="graduationUniversityOrBord"
                            value={formData.graduationUniversityOrBord}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Graduation Year:</label>
                        <input
                            type="number"
                            name="graduationpassedOutYear"
                            value={formData.graduationpassedOutYear}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <InputWrapper>
                        <label>Graduation Marks/CGPA:</label>
                        <input
                            type="number"
                            name="graduationMarksOrCGPA"
                            value={formData.graduationMarksOrCGPA}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Graduation Branch:</label>
                        <input
                            type="text"
                            name="graduationBranch"
                            value={formData.graduationBranch}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Graduation City:</label>
                        <input
                            type="text"
                            name="graduationCity"
                            value={formData.graduationCity}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <InputWrapper>
                        <label>Intermediate College:</label>
                        <input
                            type="text"
                            name="intercollegeOrInstitute"
                            value={formData.intercollegeOrInstitute}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Intermediate University:</label>
                        <input
                            type="text"
                            name="interUniversityOrBord"
                            value={formData.interUniversityOrBord}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Intermediate Year:</label>
                        <input
                            type="number"
                            name="interpassedOutYear"
                            value={formData.interpassedOutYear}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <InputWrapper>
                        <label>Intermediate Marks/CGPA:</label>
                        <input
                            type="number"
                            name="intermarksOrCGPA"
                            value={formData.intermarksOrCGPA}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Intermediate Branch:</label>
                        <input
                            type="text"
                            name="interBranch"
                            value={formData.interBranch}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Intermediate City:</label>
                        <input
                            type="text"
                            name="interCity"
                            value={formData.interCity}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <InputWrapper>
                        <label>SSC College:</label>
                        <input
                            type="text"
                            name="ssccollegeOrInstitute"
                            value={formData.ssccollegeOrInstitute}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>SSC University:</label>
                        <input
                            type="text"
                            name="sscuniversityOrBord"
                            value={formData.sscuniversityOrBord}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>SSC Year:</label>
                        <input
                            type="number"
                            name="sscpassedOutYear"
                            value={formData.sscpassedOutYear}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <InputWrapper>
                        <label>SSC Marks/CGPA:</label>
                        <input
                            type="number"
                            name="sscmarksOrCGPA"
                            value={formData.sscmarksOrCGPA}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>SSC City:</label>
                        <input
                            type="text"
                            name="sscCity"
                            value={formData.sscCity}
                            onChange={handleChange}
                            required
                        />
                    </InputWrapper>
                </InputRow>
                <SubmitButton type="submit">Submit</SubmitButton>
            </form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
   
    margin-top: 120px;

    form {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 80%; /* Adjusted to occupy 80% of the viewport width */
        max-width: 1200px; /* Ensures the form doesn't get too wide */
        display: flex;
        flex-direction: column;
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
        color: #333;
    }
`;

const InputRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const InputWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 15px;

    &:last-child {
        margin-right: 0;
    }

    label {
        margin-bottom: 5px;
        color: #555;
    }

    input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    input:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const SubmitButton = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 120px;

    &:hover {
        background-color: #0056b3;
    }
`;

export default AddEducation;
