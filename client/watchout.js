// settings
var settings = {
  w: 800,
  h: 600,
  pr: 10,
  er: 15,
  interval: 1000,
  n: 15
};

var scoreboard = {
  score: 0,
  highscore: 0,
  collisions: 0
};

// helpers
var px = n => n + 'px';
var generate = {
  x: n => px(Math.random() * settings.w),
  y: n => px(Math.random() * settings.h)
};

// setup board
var board = d3.select('.board')
  .style({
    width: px(settings.w),
    height: px(settings.h)
  });

var scoreTicker = function() {
  scoreboard.highscore = Math.max(scoreboard.score, scoreboard.highscore);
  d3.select('.scoreboard .current span').text(scoreboard.score);
  d3.select('.scoreboard .highscore span').text(scoreboard.highscore);
  d3.select('.scoreboard .collisions span').text(scoreboard.collisions);
  scoreboard.score++;
};
setInterval(scoreTicker, 100);

// setup enemies
var enemies = board.selectAll('.enemy')
  .data(d3.range(settings.n))
  .enter()
  .append('div') 
  .classed('enemy', true)
  .style({
    left: generate.x,
    top: generate.y,
    width: px(settings.er * 2),
    height: px(settings.er * 2)
  });

var refresh = function(element) {
  element
    .transition()
    .duration(settings.interval)
    .style({
      left: generate.x,
      top: generate.y
    }).each('end', function() { 
      refresh(d3.select(this)); 
    });
};
refresh(enemies);

var colliding = false;

var detectCollisions = function() {
  var collided = false;
  board.select('.player').classed('collided', colliding);
  enemies.each(function() {
    var xDiff = this.offsetLeft - player.x;
    var yDiff = this.offsetTop - player.y;
    var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (distance < settings.er + settings.pr) {
      collided = true;
    }
  });
  if (collided) {
    scoreboard.score = 0;
    if (colliding !== collided) {
      scoreboard.collisions++;
    }
  }
  colliding = collided;
};
d3.timer(detectCollisions);

// setup player
var player = {
  x: settings.w / 2,
  y: settings.h / 2,
  r: settings.pr
};

d3.select('.player').style({
  left: px(player.x),
  top: px(player.y),
  width: px(settings.pr * 2),
  height: px(settings.pr * 2)
});

board.on('mousemove', function() {
  var mouse = d3.mouse(this);
  player.x = mouse[0];
  player.y = mouse[1];

  d3.select('.player').style({
    left: px( player.x - player.r ),
    top: px( player.y - player.r )
  });

});