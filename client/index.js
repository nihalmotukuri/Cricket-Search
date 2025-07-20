const formEl = document.getElementById('search-form');
const inputEl = document.getElementById('search-input');
const addPlayerForm = document.getElementById('add-player-form');
const playerName = document.getElementById('player_name');
const jerseyNum = document.getElementById('jersey_number');
const runsScored = document.getElementById('runs_scored');
const nationality = document.getElementById('nationality');
const searchResults = document.getElementById('searchResults')

formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const fetchedData = await fetch(`http://localhost:3000/players/${inputEl.value}`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.err(err))
    console.log(fetchedData)
    const fetchedName = document.createElement("li")
    const fetchedJN = document.createElement("li")
    const fetchedRuns = document.createElement("li")
    const fetchedNationality = document.createElement("li")
    fetchedName.textContent = `Player Name: ${fetchedData.name}`
    fetchedJN.textContent = `Jersey Number: ${fetchedData.jersey_number}`
    fetchedRuns.textContent = `Total Runs: ${fetchedData.runs_scored}`
    fetchedNationality.textContent = `Nationality: ${fetchedData.nationality}`
    searchResults.appendChild(fetchedName)
    searchResults.appendChild(fetchedJN)
    searchResults.appendChild(fetchedRuns)
    searchResults.appendChild(fetchedNationality)

    inputEl.value = "";
})

addPlayerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const options = {
        method: 'POST', 
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: playerName.value,
            jersey_number: jerseyNum.value,
            runs_scored: runsScored.value,
            nationality: nationality.value
        })
    }

    fetch('http://localhost:3000/add_player', options)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err.message))

    playerName.value = ''
    jerseyNum.value = ''
    runsScored.value = ''
    nationality.value = ''
})