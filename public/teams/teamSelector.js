const teamImages = document.querySelectorAll(".carousel_item1");
const teamIDIndex = [
  ['Hawks', 'Hawks', '1610612737'],
  ['Celtics', 'Celtics', '1610612738'],
  ['Cavaliers', 'Cavaliers', '1610612739'],
  ['Pelicans', 'Pelicans', '1610612740'],
  ['Bulls', 'Bulls', '1610612741'],
  ['Mavericks', 'Mavericks', '1610612742'],
  ['Nuggets', 'Nuggets', '1610612743'],
  ['Warriors', 'Warriors', '1610612744'],
  ['Rockets', 'Rockets', '1610612745'],
  ['Clippers', 'Clippers', '1610612746'],
  ['Lakers', 'Lakers', '1610612747'],
  ['Heat', 'Heat', '1610612748'],
  ['Bucks', 'Bucks', '1610612749'],
  ['Timberwolves', 'Timberwolves', '1610612750'],
  ['Nets', 'Nets', '1610612751'],
  ['Knicks', 'Knicks', '1610612752'],
  ['Magic', 'Magic', '1610612753'],
  ['Pacers', 'Pacers', '1610612754'],
  ['76ers', '76ers', '1610612755'],
  ['Suns', 'Suns', '1610612756'],
  ['Trail Blazers', 'Trail Blazers', '1610612757'],
  ['Kings', 'Kings', '1610612758'],
  ['Spurs', 'Spurs', '1610612759'],
  ['Thunder', 'Thunder', '1610612760'],
  ['Raptors', 'Raptors', '1610612761'],
  ['Jazz', 'Jazz', '1610612762'],
  ['Grizzlies', 'Grizzlies', '1610612763'],
  ['Wizards', 'Wizards', '1610612764'],
  ['Pistons', 'Pistons', '1610612765'],
  ['Hornets', 'Hornets', '1610612766']
];
let teamSelected = ['','','']; //Alt, Name, ID
let allTeamData;
let allPlayerData;
let allArenaData;
let resultDIVOLD = document.querySelector('#teamResultsTEST');
let teamDiv = {
    teamName: document.querySelector('#teamName'),
    division: document.querySelector('#teamDivision'),
    conference: document.querySelector('#teamConference'),
    arena: document.querySelector('#teamArena'),
    coach: document.querySelector('#teamCoach'),
    generalManager: document.querySelector('#teamGeneralManager'),
    teamPlayersTable: document.querySelector('#teamPlayers'),
    teamResultContainer: document.querySelector('#teamResultContainer')
};
let previouslySelected = -1;
let selectedTeamPlayers = [];

//GET TEAMS
fetch('/api/basketball/teams')
  .then(response => response.json())
  .then(data => {
    allTeamData = data;
    console.log(data);
    console.log('Team data received!');
  });

//GET PLAYERS
fetch('/api/basketball/players')
  .then(response => response.json())
  .then(data => {
    allPlayerData = data;
    console.log(data);
    console.log('Player data received!');
  });

//GET ARENAS
fetch('/api/basketball/arenas')
      .then(response => response.json())
      .then(data => {
        allArenaData = data;
        console.log(data);
        console.log('Arena data received!');
        });


//Hide Team Data Divs
teamDiv.teamResultContainer.style.display = 'none';


for (let i = 0; i < teamImages.length; i++) {
  teamImages[i].addEventListener("click", function() {
    console.log('CLICKED TEAM');
    teamClicked(teamImages[i]);
    if(previouslySelected != -1){
      console.log('CHANGED PREV SELECTION');
      teamImages[previouslySelected].setAttribute('class','carousel_item1');
    }
    teamImages[i].setAttribute('class','carousel_item1 selectedImage');
    previouslySelected = i;
  });
}

function teamClicked(selectedTeam){
  selectedTeamPlayers = [];
  let teamName = selectedTeam['childNodes'][1]['alt'];
  console.log('TEAM CLICKED: ' + teamName);
  teamSelected[0] = teamName;
  for(let i = 0; i < teamIDIndex.length; i++){
    if(teamIDIndex[i][0] == teamName){
      teamSelected[1] = teamIDIndex[i][1];
      teamSelected[2] = teamIDIndex[i][2];
    }
  }
  console.log('TEAM ALT NAME: ' + teamSelected[0]);
  console.log('TEAM Name: ' + teamSelected[1]);
  console.log('TEAM ID: ' + teamSelected[2]);
  getPlayerData(teamSelected[2]);
  displayTeamData(teamSelected[2]);
}

function getPlayerData(teamID){
  for(let i = 0; i < allPlayerData.length; i++){
    if(allPlayerData[i]['team_id'] == teamSelected[2]){
      selectedTeamPlayers.push(allPlayerData[i])
    }
  }
  console.log('PLAYERS ON SELECTED TEAM')
  console.log(selectedTeamPlayers)
}

function displayTeamData(teamID){
  let selectedTeamData;
  for(let i = 0; i < allTeamData.length; i++){
    if(allTeamData[i]['team_id'] == teamSelected[2]){
      selectedTeamData = allTeamData[i];
    }
}
    console.log('SELECTED TEAM DATA')
    console.log(selectedTeamData);
    //Team Data
    teamDiv.teamName.innerHTML = selectedTeamData['team_name'];
    teamDiv.division.innerHTML = "<b>DIVISION: </b><br>"+selectedTeamData['division'];
    teamDiv.conference.innerHTML = "<b>CONFERENCE: </b><br>"+selectedTeamData['conference'];
    let arenaIndexID = selectedTeamData['arena_id'] - 1;
    teamDiv.arena.innerHTML = "<b>Arena: </b><br>" + allArenaData[arenaIndexID].name;
    teamDiv.coach.innerHTML = "<b>COACH: </b><br>"+selectedTeamData['coach'];
    teamDiv.generalManager.innerHTML = "<b>GEN. MANAGER: </b><br>"+selectedTeamData['general_manager'];
    //Team Players
    //Clear team players
    teamDiv.teamPlayersTable.innerHTML = '<thead><tr><th>Name</th><th>Position</th><th>Year Drafted</th><th>More</th></tr></thead>';
    for(let i = 0; i < selectedTeamPlayers.length; i++){
        var row = teamDiv.teamPlayersTable.insertRow([i+1]);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = selectedTeamPlayers[i]['first_name'] + " " + selectedTeamPlayers[i]['last_name'];
        cell2.innerHTML = selectedTeamPlayers[i]['position'];
        cell3.innerHTML = selectedTeamPlayers[i]['year_drafted'];
        cell4.innerHTML = "Edit";
    }
    //SHOW
    teamDiv.teamResultContainer.style.display = 'flex';
    document.querySelector('#nbaLogo').style.marginTop = '20px'; //makes NBA logo closer so there is not a huge space at the bottom
    /*
    //OLD CODE
    resultDIVOLD.innerHTML = '';
    let addedHTML =`
    <div class = 'columns is-centered is-mobile'>
    <div class = 'column is-two-thirds'>
    <div class = 'box has-text-black has-background-white mt-6'>
        <li>TEAM NAME: ${selectedTeamData['team_name']}</li>
        <li>DIVISION: ${selectedTeamData['division']}</li>
        <li>CONFERENCE: ${selectedTeamData['conference']}</li>
        <li>COACH: ${selectedTeamData['coach']}</li>
        <li>TEAM PLAYERS:</li>
  `;
    console.log(selectedTeamPlayers[0]['first_name']);
    for(let i = 0; i < selectedTeamPlayers.length; i++){
        addedHTML += `<li>${selectedTeamPlayers[i]['first_name']} ${selectedTeamPlayers[i]['last_name']}</li>`;
    }
    addedHTML += '</div> </div> </div>'
    resultDIVOLD.innerHTML = addedHTML;
    */
}


//Debugging help code
//console.log(teamIDIndex);
//console.log(teamImages[1]['childNodes'][1]['alt']);