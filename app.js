// document.getElementById("name").focus();

function addPlayer(event) {
    event.preventDefault();
    let playerName = document.getElementById("name").value;
    if (playerName !== "") {
        player = new Player(playerName);
        let nameArray = [];
        for (let i = 0; i < Player.list.length; i++)
            nameArray.push(Player.list[i].name);
        document.getElementById("playerNames").innerHTML = nameArray.join(" ");
        document.getElementById("name").value = "";
        document.getElementById("startGame").disabled = false;
    }
}

function startGame(event) {
    event.preventDefault();
    document.getElementById("names").style.display = "none";
    document.getElementById("players").style.display = "none";
    document.getElementById("startGame").style.display = "none";
    document.getElementById("scoreBoard").style.display = "block";
    document.getElementById("throwScore").focus();

    showPlayers();
    playerDetails();
}

function markScore(event) {
    event.preventDefault();

    console.log(Player.list[Player.list.length -1].number -1 +" vs " + Player.current);

    let score = document.getElementById("throwScore").value;
    if (score !== "") {
        score = parseInt(score.replace(/ /g, ''));
        if (score <= Player.list[Player.current].canHit && score >= 0) {
            if (Player.gameRound < Player.list[Player.current].round)
                Player.current++;

            Player.list[Player.current].getScore(score);
            document.getElementById("throwScore").value = "";
            showPlayers();
        }
    }
}

function showPlayers() {
    getPos();
    Player.list[Player.current].updateScore();
    console.log(isEndRound());
    if (Player.list[Player.list.length -1].round !== 0 && Player.list[Player.list.length - 1].round === Player.gameRound && isEndRound()) {
        console.log("Resetting...");
        Player.current = 0;
    }
    if (Player.list[Player.current].round > Player.gameRound)
        Player.current++;
    let showPlayer = Player.current;
    if (Player.current + 1 < Player.list.length && Player.list[Player.current].round > Player.list[Player.current + 1].round)
        showPlayer += 1;
    let nextPlayer = showPlayer + 1;
    if (nextPlayer === Player.list.length)
        nextPlayer = 0;
    console.log("show player: " + showPlayer);
    document.getElementById("currentNext").innerHTML =
        `<strong>Round: </strong> ${Player.list[showPlayer].round - Player.list[showPlayer].numOfStrikes + 1}  Throw#: ${Player.list[showPlayer].throw+1}` +
        "<div id='" + Player.list[showPlayer].name + "'><strong>Current Player: </strong>" + Player.list[showPlayer].name + " - " +
        Player.list[showPlayer]. totalScore + " points" +
        "<br><strong>Next Player: </strong>" + Player.list[nextPlayer].name +
        " - " + Player.list[nextPlayer]. totalScore + " points</div>";
    if (isGameOver(Player.list[Player.current]))
        Player.current++;
    if (isEndOfGame()) {
        scoreCard();
        return;
    }
}

function playerDetails() {
    console.log("Player.list.length: " + Player.list.length);
    let playerList = "";
    for (let i = 0; i < Player.list.length; i++) {
       playerList += "<div id='" + Player.list[i].name + "' onclick='showDetails(" + Player.list[i].number + ") '><strong>" + Player.list[i].name + "</strong></div>";
    }
    document.getElementById("playerDetails").innerHTML = playerList;
}

function showDetails(player) {
    console.log("Show details for " + Player.list[player -1].name);
    document.getElementById("showDetails").innerHTML =
        "<strong>Player Name: </strong>" + Player.list[player - 1].name +
        "<br><strong>Points: </strong>" + Player.list[player - 1].totalScore +
        "<br><strong>Position: </strong>" + Player.list[player - 1].pos +
        "<br><strong>scores: </strong> [" + Player.list[player - 1].score + "]";
}

function isEndRound() {
    let i = 0;
    var currentPlayer = Player.list[i];
    var nextPlayer;
    while (currentPlayer !== Player.list[Player.list.length - 1])
    {
        currentPlayer = Player.list[i];
        if (Player.list[i] !== Player.list[Player.list.length - 1])
            nextPlayer = Player.list[i + 1];
        if (currentPlayer.round !== nextPlayer.round)
            return false;
        i++;
    }
    return true;
}

function isGameOver(player) {
    console.log("round info: playerRound:" + player.round + " strikes:" + player.numOfStrikes);
    if (player.round - player.numOfStrikes > 9) {
        console.log(`game over for player ${player.name}`);
        return true;
    }
    return false;
}


function isEndOfGame() {
    let i = 0;
    while (i < Player.list.length && isGameOver(Player.list[i]) === true) {
        i++;
    }
    if (i === Player.list.length)
        return true;
    return false;
}

function getPos() {
    Player.sortedPlayers = [...Player.list];
    Player.sortedPlayers.sort((a,b) => (a.totalScore < b.totalScore) ? 1 : ((b.totalScore < a.totalScore) ? -1 : 0));
    for (let i = 0; i < Player.sortedPlayers.length; i++){
        Player.sortedPlayers[i].position = i + 1;
    }
    for (let i = 0; i < Player.sortedPlayers.length; i++){
        let j = 0;
        while (Player.list[i].name !== Player.sortedPlayers[j].name)
            j++;
        Player.list[i].pos = Player.sortedPlayers[j].position;
    }
    console.log(Player.sortedPlayers);
    console.log(Player.list);
}

function scoreCard() {
    let scoreDetails = "";
    for (let i = 0; i < Player.sortedPlayers.length; i++){
        scoreDetails += `<br><strong>Position: ${i + 1} </strong> ${Player.sortedPlayers[i].name} ${Player.sortedPlayers[i].totalScore} points`
    }
    document.getElementById("scoreBoard").innerHTML = scoreDetails +
        "<br><button onclick='window.location.href = \"index.html\"'>New Game</button>";
}


module.exports = {
    addPlayer: addPlayer,
    showPlayers: showPlayers
}