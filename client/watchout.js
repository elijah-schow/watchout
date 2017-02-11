// Main Game Loop
const time = 1000;
var board = d3.select('svg.board');
var enemies = generateEnemies(20);

update(enemies);
setInterval(function() {  
  update(enemies);
}, time);

// Collisions
setInterval(function() {
  var player = d3.select('svg.board').select('.player').data()[0];
  enemies.forEach(function(enemy) {
    if (collision(enemy, player)) {
      console.log('BOOM!');
    }
  });
}, 20);

// Player
board
  .append('circle')
  .data([{
    'x': board.attr('width') / 2,
    'y': board.attr('height') / 2,
    'r': 10
  }])
  .classed('player', true)
  .attr('cx', board.attr('width') / 2)
  .attr('cy', board.attr('height') / 2)
  .attr('r', 10)
  .attr('fill', 'red')
  .attr('stroke', 'grey')
  .attr('stroke-width', 1)
  .attr('opacity', 0)
  .transition()
  .duration(time / 2)
  .attr('opacity', 1);

board.select('.player')
  .call(d3.behavior.drag()
    .on('drag', function(d) {
      d3.select(this)
        .attr('cx', d.x = d3.event.x)
        .attr('cy', d.y = d3.event.y);
    }));

// Enemies
function generateEnemies (count) {
  var enemies = [];
  for (var index = 0; index < count; index++) {
    enemies.push( {'id': index, 'r': 20});
  }
  return enemies;
}

function update (items) {

  // Randomize enemy positions
  items.forEach(function(value) {
    //Randomize enemy positions
    value.x = Math.random() * (board.attr('width') - 30) + 15;
    value.y = Math.random() * (board.attr('height') - 30) + 15;
  });

  // Make a slection
  var selection = d3.select('.board')
    .selectAll('circle.enemy')
    .data(items);

  // Update enemy positions
  selection.transition()
    .duration(time)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  // Add new enemies to the board
  selection
    .enter()
    .append('circle')
    .classed('enemy', true)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', '15')
    .attr('fill', 'black')
    .attr('opacity', 0)
    .transition()
    .duration(time / 2)
    .attr('opacity', 1);

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