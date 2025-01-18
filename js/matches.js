async function getLiveMatches(){
  try{
    let res = await fetch('https://api-banter-backend.onrender.com/api/matches',{
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
  matches.forEach((match) => {
  let htmlSegment = `<div class="match">
		     <p class="clubs>${match.homeTeam.name} vs ${match.awayTeam.name}</p>
  		     <p class="clubs>Score-Line: ${match.score.fullTime.home} - ${match.status} - ${match.score.fullTime.away}</p>
  		     <a class="chat-link" onlick="setMatchId(${match.id})" href="./chatRoom.html">Enter Chat Room<a>
                     </div>`;
  html += htmlSegment;
})

let container = document.getElementById('dashboard');
container.innerHTML = html;
}

renderMatches()

async function setMatchId(id){
  try{
    let res = await fetch(`https://api-banter-backend.onrender.com/api/matches:${id}`);
    return await res.json();
  }catch(err){
    return err;
  }
}

async function renderMatch(){
  let match = await setMatchId();
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
container.innerHTML = html;
}



renderMatch();