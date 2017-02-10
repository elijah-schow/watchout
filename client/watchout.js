var update = function(items) {

  // Randomize enemy positions
  items.forEach(function(value, index, collection){
    //Randomize enemy positions
    collection[index].x = Math.random() * 600;
    collection[index].y = Math.random() * 600;
  });

  // Make a slection
  var selection = d3.select('.board')
    .selectAll('circle')
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

};

const time = 1000;
var data = [];
var n = 20;
for (var i = 0; i < n; i++) {
  data.push( { 'id' : i} );
}

update(data);
setInterval(function() {  
  update(data);
}, time);