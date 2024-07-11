import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import { FaRegSun, FaBed, FaBan } from 'react-icons/fa';
import { getToken } from '../../utils/JWT_Token'; // Adjust the path based on your project structure

// Register the required components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Leave = () => {
    const [leaveData, setLeaveData] = useState({ casual: 0, sick: 0, unpaid: 0 });
    const [empnumber, setEmpNumber] = useState('');

    useEffect(() => {
        const fetchEmpNumber = async () => {
            try {
                const empNumberFromStorage = sessionStorage.getItem('empNumber');
                if (empNumberFromStorage) {
                    setEmpNumber(empNumberFromStorage);
                }
            } catch (error) {
                console.error('Error fetching empnumber from session storage:', error);
            }
        };

        fetchEmpNumber();
    }, []);

    useEffect(() => {
        if (empnumber) {
            const fetchLeaveData = async () => {
                try {
                    const token = getToken();
                    const response = await axios.get(`http://localhost:2022/leaveBalance/availableLeaves?empnumber=${empnumber}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data = response.data.leaveBalance;
                    const parsedLeaveData = { casual: 0, sick: 0, unpaid: 0 };

                    data.forEach(leave => {
                        if (leave.leaveType === 'Casual') {
                            parsedLeaveData.casual = leave.availableDays;
                        } else if (leave.leaveType === 'Sick') {
                            parsedLeaveData.sick = leave.availableDays;
                        } else if (leave.leaveType === 'Unpaid') {
                            parsedLeaveData.unpaid = leave.availableDays;
                        }
                    });

                    setLeaveData(parsedLeaveData);
                } catch (error) {
                    console.error('Error fetching leave data:', error);
                }
            };

            fetchLeaveData();
        }
    }, [empnumber]);

    const chartData = {
        labels: ['Casual Leave', 'Sick Leave', 'Unpaid Leave'],
        datasets: [
            {
                label: 'Leave Types',
                data: [leaveData.casual, leaveData.sick, leaveData.unpaid],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <Wrapper>
            <div className="leave-container">
                <div className="leave-type">
                    <div className="leave-icon"><FaRegSun /></div>
                    <span>Casual Leave ({leaveData.casual} days)</span>
                </div>
                <div className="leave-type">
                    <div className="leave-icon"><FaBed /></div>
                    <span>Sick Leave (Total {leaveData.sick} days)</span>
                </div>
                <div className="leave-type">
                    <div className="leave-icon"><FaBan /></div>
                    <span>Unpaid Leave ({leaveData.unpaid} days)</span>
                </div>
            </div>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <Pie data={chartData} />
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .leave-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .leave-type {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        width: 120px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
    }

    .leave-type:hover {
        transform: translateY(-5px);
    }

    .leave-icon {
        font-size: 2rem;
        margin-bottom: 10px;
        color: #555;
    }

    span {
        font-size: 1rem;
        color: #333;
    }

    .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .chart-wrapper {
        width: 20%; /* Adjusted width to fit chart size */
       
    }
`;

export default Leave;
