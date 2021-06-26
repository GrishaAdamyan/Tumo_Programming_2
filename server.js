var express = require('express');
var app = express();
var server = require('http').createServer(app);
io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
  res.redirect('index.html');
});
server.listen(3000);

io.on('connection', function (socket) {
  for (var i in messages) {
    socket.emit("display message", messages[i]);
  }
  socket.on("send message", function (data) {
    messages.push(data);
    io.sockets.emit("display message", data);
  });
});
count = 0
matrix = []
for (var i = 0; i < 30; i++) {
  matrix[i] = []
  for (var j = 0; j < 30; j++) {
    var a = Math.floor(Math.random() * 100)
    if (a >= 0 && a < 70) {
      matrix[i][j] = 1
    }
    else if (a >= 70 && a < 90) {
      matrix[i][j] = 2
    }
    else if (a >= 90 && a < 95) {
      matrix[i][j] = 3
    }
    else if (a >= 95 && a < 100) {
      matrix[i][j] = 4
    }
  }
}

io.sockets.emit('send matrix', matrix)

var GrassArr = [];
var GrassEaterArr = [];
var PredatorArr = [];
var HunterArr = [];

weath = 'winter';
Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Hunter = require("./hunter")
AddCharacters = require("./addCharacters")
Cleaner = require("./cleaner")

function createObject(matrix) {
  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y, 1);
        GrassArr.push(gr);
      }
      else if (matrix[y][x] == 2) {
        var ge = new GrassEater(x, y, 1);
        GrassEaterArr.push(ge);
      }
      else if (matrix[y][x] == 3) {
        var pr = new Predator(x, y, 1);
        PredatorArr.push(pr);
      }
      else if (matrix[y][x] == 4) {
        var hunt = new Hunter(x, y, 1);
        HunterArr.push(hunt);
      }
    }
  }
}

io.sockets.emit('send matrix', matrix)

function game() {
  for (let i in GrassArr) {
    try { GrassArr[i].mul(5, Grass, GrassArr, 1, this.multiply, 0) } catch (err) { continue };
  }

  for (let i in GrassEaterArr) {
    try { GrassEaterArr[i].eat(GrassArr) } catch (err) { continue };
    try { GrassEaterArr[i].mul(10, GrassEater, GrassEaterArr, 2, this.energy, 6) } catch (err) { continue };
  }

  for (let i in PredatorArr) {
    try { PredatorArr[i].eat(GrassEaterArr) } catch (err) { continue };
    try { PredatorArr[i].mul(12, Predator, PredatorArr, 3, this.energy, 8) } catch (err) { continue };
  }

  for (let i in HunterArr) {
    try { HunterArr[i].eat(PredatorArr) } catch (err) { continue };
  }
  count += 1
  if (count % 3 == 0 && count < 90) {
    x = Math.floor(Math.random() * (matrix.length + 1))
    y = Math.floor(Math.random() * (matrix.length + 1))
    console.log(x, y)
    var p = new AddCharacters(x, y)
    p.add()
  }
  else if (count == 90) {
    var c = new Cleaner()
    c.clean()
  }
}

setInterval(game, 1000)

function cleaner() {
  var GrassArr = [];
  var GrassEaterArr = [];
  var PredatorArr = [];
  var HunterArr = [];
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = 0
    }
  }
  io.sockets.emit("send matrix", matrix);
}


function addCharacters() {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        var a = Math.floor(Math.random() * 100)
        if (a >= 0 && a < 60) {
          matrix[i][j] = 0
        }
        else if (a >= 60 && a < 70) {
          matrix[i][j] = 1
        }
        else if (a >= 70 && a < 80) {
          matrix[i][j] = 2
        }
        else if (a >= 80 && a < 90) {
          matrix[i][j] = 3
        }
        else if (a >= 90 && a < 100) {
          matrix[i][j] = 4
        }
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}


///new



function weather() {
  if (weath == "winter") {
    weath = "spring"
  }
  else if (weath == "spring") {
    weath = "summer"
  }
  else if (weath == "summer") {
    weath = "autumn"
  }
  else if (weath == "autumn") {
    weath = "winter"
  }
  io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


////

io.on('connection', function (socket) {
  createObject();
  socket.on("cleaner", cleaner);
  socket.on("addCharacters", addCharacters);
});


var statistics = {};

setInterval(function () {
  statistics.grass = GrassArr.length;
  statistics.grassEater = GrassEaterArr.length;
  statistics.predator = PredatorArr.length;
  statistics.hunter = HunterArr.length
  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    console.log("send")
  })
}, 1000)