async function getLeagues(){
  try{
    let res = await fetch("https://api-banter-backend.onrender.com/api/leagues");
    return await res.json();
  }catch(err){
    return err;
  }
}

async function renderLeagues(){
  let leagues = await getLeagues();
  let html = "";
  leagues.forEach(league => {
    let htmlSegment = `<a class="league-links" id="league.id" onclick="syncLeagueMatches()" href="./livematches.html">${league.name}</a>`;
    html += htmlSegment;
  })
  let container = document.getElementById('dashboard');
  container.innerHTML = html;
}


renderLeagues();