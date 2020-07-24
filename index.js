var express = require("express");
var app = express();
app.use(express.static("./public")) //moi request deu di vao public
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

//lắng nghe có ai kết nối ko
io.on("connection", function (socket) {
    //server tao ra socket quan ly ket noi voi client
    console.log('co ng ket noi id: ' + socket.id);
    socket.on("disconnect", function () {
        console.log(socket.id + ' ngat ket noi');
    })
    socket.on("Client-send-data", function (data) {
        console.log(data);
        // io.sockets.emit("Server-send-data", data + "!!!"); //gửi cho tất cả mọi người trong server
        // socket.emit('Server-send-data', data); //chỉ trả về cho thằng gửi lên
        socket.broadcast.emit('Server-send-data', data + "!!!");
    })
})

app.get("/", function (req, res) {
    res.render("trangchu");
});