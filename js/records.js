function gameData () {
	//qwerty code
	
	var bestDist = localStorage.getItem("highscore");
	var timesDead = localStorage.getItem("timesDead");
	//var totalDist = localStorage.getItem("totalDist");

	function writeBox () {
		var highscoreBox = document.getElementById("bestDist");
		highscoreBox.innerHTML = bestDist + "m";

		document.getElementById("gamesPlayed").innerHTML = localStorage.getItem("gamesPlayed") + " games";

		//var totalDistBox = document.getElementById("totalDist");
		//totalDistBox.innerHTML = totalDist + "m";
		document.getElementById("totalDist").innerHTML = localStorage.getItem("totalDist") + "m";
		//alert(localStorage.getItem("totalDist"));

	}

	writeBox();
}

window.onload = function () {
	gameData();
	//document.write(localStorage.getItem("totalDist"));

}