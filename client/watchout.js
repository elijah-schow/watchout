// Main Game Loop
const time = 1000;
var board = d3.select('svg');
var enemies = generateEnemies(20);

update(enemies);
setInterval(function() {  
  update(enemies);
}, time);

// Player
d3.select('svg.board')
  .append('circle')
  .classed('player', true)
  .attr('cx', board.attr('width') / 2)
  .attr('cy', board.attr('height') / 2)
  .attr('r', 10)
  .attr('fill', 'red')
  .attr('stroke', 'black')
  .attr('stroke-width', 1)
  .attr('opacity', 0)
  .transition()
  .duration(time / 2)
  .attr('opacity', 1);

// Enemies
function generateEnemies (count) {
  var enemies = [];
  for (var index = 0; index < count; index++) {
    enemies.push( {'id': index} );
  }
  return enemies;
}

function update (items) {

  // Randomize enemy positions
  items.forEach(function(value, index, collection) {
    //Randomize enemy positions
    collection[index].x = Math.random() * (board.attr('width') - 30) + 15;
    collection[index].y = Math.random() * (board.attr('height') - 30) + 15;
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