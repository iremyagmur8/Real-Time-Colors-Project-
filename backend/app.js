const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
	res.send("Real-time Project");
});

let fColor = "#282c34";

io.on("connection", (socket) => {
	console.log("Kullanıcı bağlandı");

	socket.emit("receive", fColor);

	socket.on("newColor", (color) => {
		console.log(color);

		fColor = color;
		io.emit("receive", color);
	});

	socket.on("disconnect", () => {
		console.log("Kullanıcı ayrıldı.");
	});
});

http.listen(3001, () => console.log("Server is up!"));
