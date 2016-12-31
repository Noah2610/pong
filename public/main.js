
var socket;
const port = 4445;
const cnv = {width: 800, height: 600};
const bgColor = [128,128,128];
const playerConf = {width: 24, height: 64, padding: 24, color: [64,64,128], mvInterval: 10, mvDist: 4};
const ballConf = {size: 24, color: [128,0,0], mvTimeout: 10, angleChange: 2};
let players = [];
let pIndex;
var mvUp; var mvDown;
let balls = [];


function setup() {

	createCanvas(cnv.width, cnv.height);

	
	// socket
	// socket = io.connect("http://localhost:" + port);  // load socket
	socket = io.connect("http://192.168.0.30:" + port);  // load socket

	// data transmissions
	// create and send new player information
	socket.emit("addUser");

	// get players
	socket.on("addPlayer", (playerCount) => {
		if (players.length == 0) {
			pIndex = playerCount;
		}
		// players = [];
		for (let count = players.length; count <= playerCount; count++) {
			if (count >= 1) break;
			players.push(new Player(count));
		}
		if (players.length == 2) {
			balls.push(new Ball(balls.length));
		}
	});

	// move other player
	socket.on("move", (data) => {
		players[data.index].y = data.y;
	});

	// ball bounce
	socket.on("ball", (ballData) => {
		balls[ballData.index].x = ballData.x;
		balls[ballData.index].y = ballData.y;
		balls[ballData.index].mv = ballData.mv;
	});

}


function move(dir) {
	players[pIndex].y += dir;
	socket.emit("move", {index: pIndex, y: players[pIndex].y});
}


function keyPressed() {
	// controlls
	if (keyCode === UP_ARROW) {  // up
		mvUp = setInterval(() => {move(-playerConf.mvDist)}, playerConf.mvInterval);
	} else if (keyCode === DOWN_ARROW) {  // down
		mvDown = setInterval(() => {move(playerConf.mvDist)}, playerConf.mvInterval);
	}
}

function keyReleased() {
	// controlls
	if (keyCode === UP_ARROW) {  // up
		clearInterval(mvUp);
	} else if (keyCode === DOWN_ARROW) {  // down
		clearInterval(mvDown);
	}
}


function draw() {

	// controlls
	// if (keyIsDown(UP_ARROW)) {  // up
	// 	// players[pIndex].y -= 8;
		
	// } else if (keyIsDown(DOWN_ARROW)) {  // down
	// 	players[pIndex].y += 8;
	// }


	// draw
	background(bgColor);


	// display players
	players.forEach(player => {
		player.show();
	});


	// display ball
	balls.forEach((ball) => {
		ball.show();
		ball.move();
	});

}
