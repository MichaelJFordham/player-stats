var playerInformation;
var selectedPlayer;

// Gets the player information from the local data file
fetch("./data/player-stats.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => setPlayers(data));

// Sets the players variable with the player information
function setPlayers(playerData) {
  playerInformation = playerData;
  populateSelectOptions(playerData);
}

// Populates the select options based on the information from the player-stats.json file
function populateSelectOptions(playerData) {
  var playerSelect = document.getElementById("player-select");

  playerData.players.forEach((person) => {
    playerSelect.innerHTML += `<option value="${person.player.id}">${person.player.name.first} ${person.player.name.last}</option>`;
  });
}

// Returns the currently selected player from the select element
function setSelectedPlayer(playerSelectElement) {
  selectedPerson = getPlayerInformation(Number(playerSelectElement.value)); // Casts the selected value to a Number otherwise it is passed in as a string, which fails the strict equality check (===)
  console.log(selectedPerson);

  // Adds player-card component to the DOM
  var playerCardContainer = document.getElementById("player-card-container");
  playerCardContainer.innerHTML = `<player-card id="player-card"></player-card>`;

  // Updates the information shown on the player card
  var playerCard = document.getElementById("player-card");
  playerCard.setAttribute("person", JSON.stringify(selectedPerson));
}

// Returns the information for a player based on the player ID passed in
function getPlayerInformation(playerId) {
  for (let i = 0; i < playerInformation.players.length; i++) {
    const person = playerInformation.players[i];

    // If the IDs match, the matching person is returned
    if (person.player.id === playerId) {
      return person;
    }
  }
}
