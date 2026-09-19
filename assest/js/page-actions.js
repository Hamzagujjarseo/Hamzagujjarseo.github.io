(function () {
  function goToRandomGame(event) {
    event.preventDefault();

    fetch('/assest/data/games.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Game catalog unavailable');
        return response.json();
      })
      .then(function (games) {
        var playableGames = games.filter(function (game) {
          return game && typeof game.href === 'string' && game.href.indexOf('/g/') === 0;
        });

        if (!playableGames.length) throw new Error('No games found');
        window.location.href = playableGames[Math.floor(Math.random() * playableGames.length)].href;
      })
      .catch(function () {
        window.location.href = '/all-unblocked-games/';
      });
  }

  document.querySelectorAll('[data-random-game]').forEach(function (control) {
    control.addEventListener('click', goToRandomGame);
  });

  document.querySelectorAll('[data-back-to-top]').forEach(function (control) {
    control.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();
