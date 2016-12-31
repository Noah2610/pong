

function Ball(bIndex, x=cnv.width/2, y=cnv.height/2, mv=[8,-2]) {
	this.x = x;
	this.y = y;
	this.mv = mv;
	this.canMv = true;
	this.index = bIndex;


	this.send = function () {
		let data = {
			x: this.x,
			y: this.y,
			mv: this.mv,
			index: this.index
		};
		socket.emit("ball", data);
	}


	this.bounce = function () {
		let parts = {
			center: [players[pIndex].y - playerConf.height / 4, players[pIndex].y + playerConf.height / 4],
			top: [players[pIndex].y - playerConf.height / 2, players[pIndex].y - playerConf.height / 4],
			bottom: [players[pIndex].y + playerConf.height / 4, players[pIndex].y + playerConf.height / 2]
		};

		if (this.y > parts.center[0] && this.y < parts.center[1]) {  // check center of pad
			this.mv[0] *= -1;
		} else if (this.y >= parts.top[0] && this.y <= parts.top[1]) {  // check top of pad
			this.mv = [this.mv[0] * -1, this.mv[1] - ballConf.angleChange];
		} else if(this.y >= parts.bottom[0] && this.y <= parts.bottom[1]) {  // check bottom of pad
			this.mv = [this.mv[0] * -1, this.mv[1] + ballConf.angleChange];
		}
	}


	this.move = function () {
		if (this.canMv) {
			this.x += this.mv[0];
			this.y += this.mv[1];

			// check pad collision
			let tmp = pIndex ? (ballConf.size / 2) : -(ballConf.size / 2);
			if (this.x >= players[pIndex].x - playerConf.width / 2 && this.x <= players[pIndex].x + playerConf.width / 2 && this.y >= players[pIndex].y - playerConf.height / 2 && this.y <= players[pIndex].y + playerConf.height / 2) {
				this.bounce();
				this.send();
			}

			// check wall collision
			if (pIndex == 0) {
			if (this.y <= 0 || this.y >= cnv.height) {
				this.mv[1] *= -1;
				this.send();
			}	
			}

			this.canMv = false;
			setTimeout(() => (this.canMv = true), ballConf.mvTimeout);
		}
	}


	this.show = function () {
		stroke(0,0,0);
		strokeWeight(2);
		fill(ballConf.color);
		ellipseMode(CENTER);
		ellipse(this.x,this.y, ballConf.size, ballConf.size);
	}
}
