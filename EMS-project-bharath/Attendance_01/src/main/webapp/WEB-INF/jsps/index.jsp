<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance System</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 10px;
            color: #555;
            font-weight: bold;
            font-size: 18px;
        }
        input {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            background-color: #007bff;
            border: none;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #0056b3;
        }
        #attendanceRecords {
            margin-top: 40px;
            text-align: left;
            font-size: 16px;
        }
        #attendanceRecords ul {
            list-style: none;
            padding: 0;
        }
        #attendanceRecords li {
            margin-bottom: 10px;
        }
        #stopwatch {
            font-size: 1.5em;
            margin-top: 20px;
            color: #555;
        }
    </style>
    <script>
        let stopwatchInterval;
        let elapsedTime = 0;

        function startStopwatch() {
            elapsedTime = 0;
            clearInterval(stopwatchInterval);
            stopwatchInterval = setInterval(() => {
                elapsedTime++;
                let hours = Math.floor(elapsedTime / 3600);
                let minutes = Math.floor((elapsedTime % 3600) / 60);
                let seconds = elapsedTime % 60;
                $('#stopwatch').text(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            }, 1000);
        }

        function stopStopwatch() {
            clearInterval(stopwatchInterval);
        }

        function login() {
            const userId = $('#userId').val();
            $.ajax({
                url: '/attendance/login',
                type: 'POST',
                data: { userId: userId },
                success: function(response) {
                    alert('Login successful');
                    console.log(response);
                    startStopwatch();
                },
                error: function(xhr, status, error) {
                    alert('Login failed');
                    console.error(error);
                }
            });
        }

        function logout() {
            const userId = $('#userId').val();
            $.ajax({
                url: '/attendance/logout',
                type: 'POST',
                data: { userId: userId },
                success: function(response) {
                    alert('Logout successful');
                    console.log(response);
                    stopStopwatch();
                },
                error: function(xhr, status, error) {
                    alert('Logout failed');
                    console.error(error);
                }
            });
        }

        function getAttendanceById() {
            const id = $('#attendanceId').val();
            $.ajax({
                url: `/attendance/${id}`,
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    if (response) {
                        $('#attendanceRecords').html(
                            `<ul><li>ID: ${response.id}</li><li>User ID: ${response.userId}</li><li>Action: ${response.action}</li><li>IP Address: ${response.ipAddress}</li><li>Location: ${response.location}</li></ul>`
                        );
                    } else {
                        $('#attendanceRecords').html('<p>No records found</p>');
                    }
                },
                error: function(xhr, status, error) {
                    alert('Failed to fetch attendance record');
                    console.error(error);
                }
            });
        }

        function getAllAttendance() {
            $.ajax({
                url: '/attendance/all',
                type: 'GET',
                success: function(response) {
                    console.log(response);
                    if (Array.isArray(response)) {
                        let attendanceRecords = '<ul>';
                        response.forEach(record => {
                            attendanceRecords += `<li>ID: ${record.id}, User ID: ${record.userId}, Action: ${record.action}, IP: ${record.ipAddress}, Location: ${record.location}</li>`;
                        });
                        attendanceRecords += '</ul>';
                        $('#attendanceRecords').html(attendanceRecords);
                    } else {
                        $('#attendanceRecords').html('<p>No records found</p>');
                    }
                },
                error: function(xhr, status, error) {
                    alert('Failed to fetch attendance records');
                    console.error(error);
                }
            });
        }
    </script>
</head>
<body>
    <div class="container">
        <h1>Attendance System</h1>
        <label for="userId">User ID:</label>
        <input type="text" id="userId" name="userId" required>
        <button onclick="login()">Login</button>
        <button onclick="logout()">Logout</button>
        <label for="attendanceId">Attendance ID:</label>
        <input type="text" id="attendanceId" name="attendanceId">
        <button onclick="getAttendanceById()">Get Attendance By ID</button>
        <button onclick="getAllAttendance()">Get All Attendance</button>
        <div id="stopwatch">00:00:00</div>
        <div id="attendanceRecords"></div>
    </div>
</body>
</html>
