
<!DOCTYPE html>
<html>
<head>
    <title>JSON Response Table</title>
    <style>        html,
        body {
            height: 100%;
        }

        body {
            margin: 0;
            background: linear-gradient(45deg, #49a09d, #5f2c82);
            font-family: Copperplate, sans-serif;
            font-weight: 100;
        }

        .container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        th,
        td {
            padding: 15px;
            text-align: center;
            background-color: rgba(255, 255, 255, 0.2);
            color: #fff;
        }

        th {
            text-align: center;
        }

        thead {
            th {
                background-color: #55608f;
            }
        }

        tbody {
            tr {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                }
            }
            td {
                position: relative;
                &:hover {
                    &:before {
                        content: "";
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: -9999px;
                        bottom: -9999px;
                        background-color: rgba(255, 255, 255, 0.2);
                        z-index: -1;
                    }
                }
            }
        }
 html,
        body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Copperplate, sans-serif;
            background-color: #f1f1f1;
        }

        h1 {
            font-size: 30px;
            color: #fff;
            text-transform: uppercase;
            font-weight: 300;
            text-align: center;
            margin: 15px 0;
        }

        .tbl-header,
        .tbl-content {
            width: 100%;
            overflow-x: auto;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px 15px;
            text-align: center;
            font-weight: 500;
            font-size: 12px;
            color: #fff;
            text-transform: uppercase;
        }

        th {
            background-color: #333;
        }

        td {
            background-color: #555;
            border-bottom: solid 1px rgba(255, 255, 255, 0.1);
        }

        @media only screen and (max-width: 600px) {
            .tbl-header,
            .tbl-content {
                width: auto;
            }
        }
    </style>
</head>
<body>
     </style>
</head>
<body>
    <h1>JSON Response Table</h1>
    <div class="tbl-header">
        <table>
            <thead>
                <tr>
                    <th>Team 1</th>
                    <th>Team 2</th>
                </tr>
            </thead>
        </table>
    </div>
    <div class="tbl-content">
        <table id="responseTable">
            <tbody></tbody>
        </table>
    </div>
    <script>
        // Function to create the table from JSON data
        function createTableFromJSON(jsonData) {
            var table = document.getElementById('responseTable');

            // Create table rows
            for (var i = 0; i < jsonData.length; i++) {
                var row = document.createElement('tr');
                var team1Data = jsonData[i][0].displayValue || '';
                var team2Data = jsonData[i][1].displayValue || '';

                var td1 = document.createElement('td');
                td1.textContent = team1Data;
                row.appendChild(td1);

                var td2 = document.createElement('td');
                td2.textContent = team2Data;
                row.appendChild(td2);

                table.appendChild(row);
            }
        }

        // Fetch data from the API
        fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard")
            .then(response => response.json())
            .then(data => {
                // Extract the desired data from the API response
                var response = data?.events?.[0]?.competitions?.[0]?.competitors;

                // Call the function to create the table with the response data
                createTableFromJSON(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    </script>
</body>
</html>