// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express")
const app = express()
let http = require('http').createServer(app)
let port = process.env.port || 3000
let io = require('socket.io')(http)
const low = require('lowdb')

app.use(express.urlencoded({extended: true})) 
app.use(express.static("public"));

// https://github.com/typicode/lowdb usage instructions
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/home2", (request, response) => {
  response.sendFile(__dirname + "/views/index2.html");
});
app.get("/stella", (request, response) => {
  response.sendFile(__dirname + "/views/stella.html");
});
app.get("/hyeree", (request, response) => {
  response.sendFile(__dirname + "/views/hyeree.html");
});

db.defaults({noises: []}).write()

let noises = db.get('noises')

io.on('connection', (socket) => {
  console.log('a user connected');
  
  io.emit('refresh data', noises)
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('new click', (click)=>{
    console.log(click)
    db.get('noises').push(click).write()
    io.emit('refresh data', noises)
  })
  
});





//launch the server
http.listen(port, ()=>{
  console.log(`listening on port :${port}`)
})
