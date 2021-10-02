const template = document.createElement("template");

template.innerHTML = `
    <style>
        .player-face {
            margin-top: 40px;
            height: 200px;
            width: auto;
        }

        .player-content {
            padding: 16px 12px;
            background-color: #D20249;
            margin-top: -4px;
        }

        .flex-container {
            display: flex;
            gap: 16px;
            justify-content: space-between;
        }

        .key-info {
            max-width: 70%;
        }

        .player-name, .player-position {
            color: white;
        }

        .player-name {
            font-weight: 400;
            margin: 0;
            font-size: 20px;
        }

        .player-position {
            margin: 4px 0;
            font-size: 14px;
        }

        .club-crest {
            height: 80px;
            width: 80px;
            border-radius: 50%;
            background-color: green;
            margin-top: -40px;
        }

        table {
            width: 100%;
            margin-top: 16px;
            border-spacing: 0 4px;
        }

        table tr {
            background-color: white;
            color: #2F0C34;
        }

        table td {
            padding: 8px;
        }

        .table-data {
            text-align: right;
            font-weight: 600;
        }
    </style>

    <div class="player-info">
        <img class="player-face" src="" alt="">
        <div class="player-content">
            <div class="flex-container">
                <div class="key-info">
                    <h1 class="player-name"></h1>
                    <p class="player-position"></p>
                </div>
                
                <img class="club-crest" src="./assets/badges_sprite.png" alt="">
            </div>

            <table>
                <tr>
                    <td class="table-label">Appearances</td>
                    <td class="table-data">XX</td>
                </tr>
                <tr>
                    <td class="table-label">Appearances</td>
                    <td class="table-data">XX</td>
                </tr>
            </table>

        </div>
    </div>
`;

// Creates custom element which could be reused elsewhere if needed
class PlayerCard extends HTMLElement {
  static get observedAttributes() {
    return ["person"];
  }

  constructor() {
    super(); // Calls the constructor of the HTMLElement class we're extending

    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    console.log(this.getAttribute("playerName"));
  }

  set person(personData) {
    // Sets the player image
    this.shadowRoot.querySelector(
      ".player-face"
    ).src = `./assets/p${personData.player.id}.png`;

    // Sets the player image alt tag text
    this.shadowRoot.querySelector(
      ".player-face"
    ).alt = `${personData.player.name.first} ${personData.player.name.last} in a ${personData.player.currentTeam.name} shirt.`;

    // Sets the player's name
    this.shadowRoot.querySelector(
      ".player-name"
    ).innerText = `${personData.player.name.first} ${personData.player.name.last}`;

    // Sets the player's position
    this.shadowRoot.querySelector(
      ".player-position"
    ).innerText = `${personData.player.info.positionInfo}`;

    // Sets the club crest alt text
    this.shadowRoot.querySelector(
      ".club-crest"
    ).alt = `${personData.player.currentTeam.name}'s club crest.`;
  }

  get person() {
    return this.getAttribute("person");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.person = JSON.parse(newVal);
  }
}

// Defines the custom element
window.customElements.define("player-card", PlayerCard);
