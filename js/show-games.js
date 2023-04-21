const showGames = () => {
  const container = document.getElementById('top-games-container')

  games.forEach(game => {
      const div = document.createElement('div')
      div.className = 'card'
      div.innerHTML = `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
          <h5 class="card-title">${game.name}</h5>
          <p class="card-text">${game.desc}</p>
          <a href="${game.play}" class="card-link" target="_blank">Play now</a>
          <a href="${game.repo}" class="card-link" target="_blank">GitHub Repo</a>
      </div>
  </div>

      `
      container.appendChild(div)
  })
};

showGames()





