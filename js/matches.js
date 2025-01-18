async function getLiveMatches(){
  try{
    let res = await fetch('https://api-banter-backend.onrender.com/api/matches/live',{
			  method: 'GET',
			  headers:{
				'Content-Type':'application/json',
				'mode': 'no-cors'
				}
})
    return await res.json();
  }catch(err){
    return err;
  }
}

async function renderMatches(){
  let matches = await getLiveMatches();
  let html = "";
  let i = 0;

  while (i < matches.Matches.length){
    matchList = matches.Matches[i];
    htmlSegment = `<div class="match">
                    <p class="clubs">${matchList.homeTeam.name} vs ${matchList.awayTeam.name}</p>
                    <p class="clubs">Score-Line: ${matchList.score.fullTime.home} - ${matchList.status} - ${matchList.score.fullTime.away}</p>
                    <a class="chat-link" onclick="setMatchId()" href="./chatRoom.html">Enter Chat Room</a>
                </div>`
    html += htmlSegment;
    i++;
  }
let container = document.getElementById('dashboard');
container.innerHTML = html;
}

renderMatches()

async function setMatchId(){
  try{
    let res = await fetch(`https://api-banter-backend.onrender.com/api/matches/live`);
    return await res.json();
  }catch(err){
    return err;
  }
}

async function renderMatch(){
  let match = await setMatchId();
  matchList = match.Matches[1];
  let html = `<ul>
		<li id="home" class="data-point-stat"><b>Home Club:</b><br>${match.homeTeam.name}</li>
                <li id="away" class="data-point-stat"><b>Away Club:</b><br>${match.awayTeam.name}</li>
                <li id="last" class="data-point-stat"><b>Competition:</b><br>${match.competition.name}</li>
                <br><br><br>
		<li id="gs-home" class="data-point-matches"><b>Goal Scored:</b><br>
                    ${match.score.fullTime.home}
                </li>
                <li id="gs-away" class="data-point-matches"><b>Goal Scored:</b><br>
                    ${match.score.fullTime.away}
                </li><br><br><br>
                <li id="time"><b>Date:</b><br>${match.utcDate}</li>
	      </ul>`;
  let container = document.getElementById('db');
container.nodeValue = html;
}



renderMatch();