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

        #club-crest {
            display: inline-block;
            background: url('./assets/badges_sprite.png');
            background-size: 1200%;
            height: 80px;
            width: 80px;
            min-height: 80px;
            min-width: 80px;
            background-size: 1200%;
            border-radius: 40px;
            margin-top: -40px;
        }

        table {
            width: 100%;
            margin-top: 16px;
            border-spacing: 0 4px;
        }

        table tr {
            background-color: #EAEAEA;
            color: #2F0C34;
            -webkit-box-shadow: 0px 2px 15px 3px rgba(0,0,0,0.3); 
            box-shadow: 0px 2px 15px 3px rgba(0,0,0,0.3);
        }

        table td {
            padding: 8px;
        }

        .table-data {
            text-align: right;
            font-weight: 600;
        }
    </style>

    <div class="player-info" role="region" aria-live="polite">
        <img class="player-face" src="" alt="">
        <div class="player-content">
            <div class="flex-container">
                <div class="key-info">
                    <h1 class="player-name"></h1>
                    <p class="player-position"></p>
                </div>
                
                <div>
                    <span id="club-crest" role="img" aria-label=""></span>
                </div>
            </div>

            <table>
                <tr>
                    <td class="table-label">Appearances</td>
                    <td id="appearance-data" class="table-data"></td>
                </tr>
                <tr>
                    <td class="table-label">Goals</td>
                    <td id="goal-data" class="table-data"></td>
                </tr>
                <tr>
                    <td class="table-label">Assists</td>
                    <td id="assist-data" class="table-data"></td>
                </tr>
                <tr>
                    <td class="table-label">Goals per match</td>
                    <td id="goal-per-match-data" class="table-data"></td>
                </tr>
                <tr>
                    <td class="table-label">Passes per minute</td>
                    <td id="pass-per-min-data" class="table-data"></td>
                </tr>
            </table>

        </div>
    </div>
`;

// Creates custom element which could be reused elsewhere if needed
class PlayerCard extends HTMLElement {
  // Ensures the person attribute is being observed for changes
  static get observedAttributes() {
    return ["person"];
  }

  constructor() {
    super(); // Calls the constructor of the HTMLElement class we're extending

    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
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

    // Sets the club crest sprite as the background image
    var clubCrest = this.shadowRoot.querySelector("#club-crest");
    clubCrest.style.backgroundPosition = this.getClubLogoPosition(
      Number(personData.player.currentTeam.id)
    );

    // Sets the club crest aria-label text (a substitute for the alt text as the element rendering the crest is a span rather than img)
    clubCrest.ariaLabel = `${personData.player.currentTeam.name}'s club crest.`;

    // Sets the appearance data
    this.shadowRoot.querySelector("#appearance-data").innerText =
      this.getPlayerStat(personData.stats, "appearances");

    // Sets the goal data
    this.shadowRoot.querySelector("#goal-data").innerText = this.getPlayerStat(
      personData.stats,
      "goals"
    );

    // Sets the assist data
    this.shadowRoot.querySelector("#assist-data").innerText =
      this.getPlayerStat(personData.stats, "goal_assist");

    // Sets the goals per match data
    this.shadowRoot.querySelector("#goal-per-match-data").innerText =
      this.calculateGoalsPerMatch(
        this.getPlayerStat(personData.stats, "goals"),
        this.getPlayerStat(personData.stats, "appearances")
      );

    // Sets the passes per minute data
    this.shadowRoot.querySelector("#pass-per-min-data").innerText =
      this.calculatePassesPerMin(
        this.getPlayerStat(personData.stats, "fwd_pass"),
        this.getPlayerStat(personData.stats, "backward_pass"),
        this.getPlayerStat(personData.stats, "mins_played")
      );
  }

  get person() {
    return this.getAttribute("person");
  }

  // Runs when the person attribute that is being passed into the custom player-card element is changed
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.person = JSON.parse(newVal);
  }

  // Returns the correct background image position based on the club ID
  getClubLogoPosition(clubId) {
    if (clubId === 26) {
      // Leicester
      return "0 0";
    } else if (clubId === 1) {
      // Arsenal
      return "-80px -80px";
    } else if (clubId === 12) {
      // Man Utd
      return "-480px -640px";
    } else if (clubId === 11) {
      // Man City
      return "-640px -560px";
    } else if (clubId === 21) {
      // Spurs
      return "-399px -800px";
    }
  }

  // Returns the relevant stat's value based on the label of the stat required
  getPlayerStat(stats, statLabel) {
    for (let i = 0; i < stats.length; i++) {
      const stat = stats[i];

      if (stat.name === statLabel) {
        return stat.value;
      }
    }

    // If the stat could not be found, return zero
    return 0;
  }

  // Returns the number of goals the player scored per match
  calculateGoalsPerMatch(goals, noOfMatches) {
    if (goals !== 0 && noOfMatches !== 0) {
      return Math.round((goals / noOfMatches) * 100) / 100;
    } else {
      return 0;
    }
  }

  // Returns the number of passes a player made per minute
  calculatePassesPerMin(forwardPasses, backwardPasses, minsPlayed) {
    var totalPasses = forwardPasses + backwardPasses;

    if (totalPasses !== 0 && minsPlayed !== 0) {
      return Math.round((totalPasses / minsPlayed) * 100) / 100;
    } else {
      return 0;
    }
  }
}

// Defines the custom element
window.customElements.define("player-card", PlayerCard);
