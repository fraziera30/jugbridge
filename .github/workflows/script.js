// Function to create the table from JSON data
function createTableFromJSON(jsonData) {
    var table = document.getElementById('responseTable');
    table.innerHTML = ''; // Clear existing table content

    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var columnNames = ['DATE', 'GAMES', 'PROBABLE STARTER'];

    for (var i = 0; i < columnNames.length; i++) {
        var columnName = columnNames[i];
        var headerCell = document.createElement('th');
        headerCell.textContent = columnName;
        headerRow.appendChild(headerCell);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    for (var i = 0; i < jsonData.length; i++) {
        var eventData = jsonData[i];
        var row = document.createElement('tr');

        // Date column
        var dateCell = document.createElement('td');
        dateCell.textContent = eventData.date;
        row.appendChild(dateCell);

        // Competitions column
        var competitionsCell = document.createElement('td');
        var competitionsText = '';
        for (var j = 0; j < eventData.competitions.length; j++) {
            var competition = eventData.competitions[j];
            var competitors = competition.competitors.map(function (competitor) {
                return competitor.team.shortDisplayName + ' (' + competitor.score + ')';
            });
            competitionsText += competitors.join(' vs ');
            if (j < eventData.competitions.length - 1) {
                competitionsText += ', ';
            }
        }
        competitionsCell.textContent = competitionsText;
        row.appendChild(competitionsCell);

        // Probable starter column
        var probableStarterCell = document.createElement('td');
        var probableStarters = eventData.competitions[0].competitors[0].probables;
        var probableStartersText = probableStarters
            ? probableStarters
                .map(function (probable) {
                    var playerId = probable.playerId;
                    var url =
                        'https://www.espn.com/mlb/player/batvspitch/_/id/' + playerId;
                    return '<a href="' +
                    url +
                    '">' +
                    probable.athlete.fullName +
                    '</a> (ERA: ' +
                    probable.statistics.find(function (stat) {
                        return stat.name === 'ERA';
                    }).displayValue +
                    ')';
                })
                .join(', ')
            : '';
        probableStarterCell.innerHTML = probableStartersText;
        row.appendChild(probableStarterCell);

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
}

function fetchPlayerDetails(url, fullName, statistics) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (jsonData) {
            displayPlayerDetails(jsonData, fullName, statistics);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}

function displayPlayerDetails(jsonData, fullName, statistics) {
    var table = document.getElementById('playerDetailsTable');

    // Create table body if it doesn't exist
    var tbody = table.getElementsByTagName('tbody')[0];
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    // Create data row
    var dataRow = document.createElement('tr');

    // Populate table cells with data
    var playerNameCell = document.createElement('td');
    playerNameCell.textContent = fullName;
    dataRow.appendChild(playerNameCell);

    for (var i = 0; i < statistics.length; i++) {
        var statistic = statistics[i];
        var statCell = document.createElement('td');
        statCell.textContent = jsonData[statistic.name]; // Replace with the actual data property
        dataRow.appendChild(statCell);
    }

    tbody.appendChild(dataRow);
}

async function fetchDataAndCreateTable() {
    try {
        const response = await fetch(
            'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard'
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const events = jsonData.events;
        createTableFromJSON(events);
    } catch (error) {
        console.error('Error:', error);
    }
}

function clearTable() {
    var table = document.getElementById('responseTable');
    table.innerHTML = '';
}

// Function to toggle dark mode
function toggleDarkMode() {
    var body = document.querySelector('body');
    body.classList.toggle('dark-mode');
}

// Call the fetchDataAndCreateTable function when the page finishes loading
window.addEventListener('load', function () {
    fetchDataAndCreateTable();

    // Add event listener to dark mode toggle button
    var darkModeButton = document.getElementById('darkModeButton');
    darkModeButton.addEventListener('click', toggleDarkMode);
});
