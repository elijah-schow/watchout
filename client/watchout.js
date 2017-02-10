var update = function(items) {
  // Enemies
  var selection = d3.select('.board')
    .selectAll('circle')
    .data(items);

  selection.transition()
    .duration(1000)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  selection
    .enter()
    .append('circle')
    .classed('enemy', true)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', '15')
    .attr('fill', 'black');

  // Remove enemies
  selection
    .exit()
    .remove();

};

var data = [
    { 'id': 0, 'x' : Math.random() * 600, 'y' : Math.random() * 600},
    { 'id': 1, 'x' : Math.random() * 600, 'y' : Math.random() * 600},
    { 'id': 2, 'x' : Math.random() * 600, 'y' : Math.random() * 600},
    { 'id': 3, 'x' : Math.random() * 600, 'y' : Math.random() * 600},
    { 'id': 4, 'x' : Math.random() * 600, 'y' : Math.random() * 600},
    { 'id': 5, 'x' : Math.random() * 600, 'y' : Math.random() * 600}
];

setInterval(function(){
  console.log('update');
  data.forEach(function(value, index, collection){
    //Randomize enemy positions
    collection[index].x = Math.random() * 600;
    collection[index].y = Math.random() * 600;
  });
  update(data);
}, 1000);