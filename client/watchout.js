// Main Game Loop
const time = 1000;
var board = d3.select('.board');
var enemies = generateEnemies(20);
var scoreboard = {
  'highScore': 0,
  'score': 0,
  'collisions': 0
};
var boardWidth = 800;
var boardHeight = 600;

update(enemies);
setInterval(function() {  
  update(enemies);
}, time);

// Collisions
setInterval(function() {
  var player = board.select('.player').data()[0];
  scoreboard.score += 2;
  enemies.forEach(function(enemy) {
    if (collision(enemy, player)) {
      scoreboard.score = 0;
      scoreboard.collisions++;
    }
  });
  if (scoreboard.score > scoreboard.highScore) {
    scoreboard.highScore = scoreboard.score;
  }
  d3.select('.highscore')
    .select('span')
    .text(scoreboard.highScore);
  d3.select('.current')
    .select('span')
    .text(scoreboard.score);
  d3.select('.collisions')
    .select('span')
    .text(scoreboard.collisions);
}, 20);



// Player
board
  .append('div')
  .data([{
    'x': boardWidth / 2,
    'y': boardHeight / 2,
    'r': 10
  }])
  .classed('player', true)
  .style('left', d => d.x + 'px')
  .style('top', d => d.y + 'px')
  .style('opacity', 0)
  .transition()
  .duration(time / 2)
  .style('opacity', 1);

board.select('.player')
  .call(d3.behavior.drag()
    .on('drag', function(d) {
      d3.select(this)
        .style('left', d.x = d3.event.x + 'px')
        .style('top', d.y = d3.event.y + 'px');
    }));

// Enemies
function generateEnemies (count) {
  var enemies = [];
  for (var index = 0; index < count; index++) {
    enemies.push( {'id': index, 'r': 15});
  }
  return enemies;
}

function update (items) {

  // Randomize enemy positions
  items.forEach(function(value) {
    //Randomize enemy positions
    value.x = Math.random() * ( boardWidth - 30) + 15;
    value.y = Math.random() * ( boardHeight - 30) + 15;
  });

  // Make a slection
  var selection = d3.select('.board')
    .selectAll('.enemy')
    .data(items);

  // Update enemy positions
  selection.transition()
    .duration(time)
    .style('left', d => d.x + 'px')
    .style('top', d => d.y + 'px');

  // Add new enemies to the board
  selection
    .enter()
    .append('div')
    .classed('enemy', true)
    .style('left', d => d.x + 'px')
    .style('top', d => d.y + 'px')
    .style('opacity', 0)
    .transition()
    .duration(time / 2)
    .style('opacity', 1);

  // Remove non-existent enemies
  selection
    .exit()
    .remove();

}

function collision (obj1, obj2) {
  var xDiff = obj1.x - obj2.x;
  var yDiff = obj1.y - obj2.y;
  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (distance < obj1.r + obj2.r) {
    return true;
  }
  return false;
}