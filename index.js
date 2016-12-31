
import express from "express";
import socket from "socket.io";
import chalk from "chalk";
import datetime from "node-datetime";

const port = 4445;
const app = express();
const server = app.listen(port);
app.use(express.static("public"));

console.log(chalk.green("server running on port " + port));

const io = socket(server);

var userCount = 0;

// new connection
io.sockets.on("connection", (socket) => {

	const ip = socket.handshake.address.substr(7);
	const id = socket.id;

	// log connection
	console.log(chalk.green(chalk.underline(curDate("H:M:S")) + " - connected: " + chalk.bold(id + " - " + ip)));


	// add connection to server var
	socket.on("addUser", () => {
		io.sockets.emit("addPlayer", userCount);
		userCount++;
	});


	// pad move data
	socket.on("move", (data) => {
		socket.broadcast.emit("move", data);
	});


	// ball data
	socket.on("ball", (data) => {
		socket.broadcast.emit("ball", data);
	});



	// disconnect
	socket.on("disconnect", () => {
		// log disconnect
		console.log(chalk.red(chalk.underline(curDate("H:M:S")) + " - disconnected: " + chalk.bold(socket.id + " - " + ip)));
		// remove from userCount
		userCount--;
	});

});



function curDate(frmt) {  // get date and/or time with format
	return datetime.create().format(frmt);
}
