

function Player(pIndex) {

	// pIndex
	// 	? (this.x = cnv.width - playerConf.padding)
	// 	: (this.x = playerConf.padding);

	if (pIndex == 0) {  // player 1
		(this.x = playerConf.padding);
	} else if (pIndex == 1) {  // player 2
		(this.x = cnv.width - playerConf.padding);
	} else this.x = -playerConf.height;

	this.y = cnv.height / 2;
	this.width = playerConf.width;
	this.height = playerConf.height;


	this.show = function () {
		stroke(0,0,0);
		strokeWeight(3);
		fill(playerConf.color);
		rectMode(CENTER);
		rect(this.x,this.y, playerConf.width,playerConf.height);
	}

}
