function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    highscores.forEach(function(score) {
      var li = document.createElement("li");
      li.classList.add("list-group-item")
      li.textContent = score.initials + " - " + score.score;
  
      var olEl = document.getElementById("highscores");
      olEl.appendChild(li);
    });

  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  printHighscores();
  
//   <div class="carousel-item active">
//             <img src="..." class="d-block w-100" alt="...">
//             <div class="carousel-caption d-none d-md-block">
//               <h5>First slide label</h5>
//               <p>Some representative placeholder content for the first slide.</p>
//             </div>
//           </div>


// carousel-inner