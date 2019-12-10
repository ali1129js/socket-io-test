/**
 * @Author: Ali
 * @Date:   2019-12-04T15:34:56+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-12-10T15:21:39+01:00
 */
const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const PORT = process.env.port || 5000
let title = "Untitles Presentation "
let connections = []
let audience = []
let results = {
  a:0,
  b:0,
  c:0,
  d:0
}

app.get('/',(req,res)=>{
  res.send('Hello SOCKER!!')
})

// Start here
io.on('connection', socket => {

  const timeStamp = new Date().toLocaleTimeString()
  console.log(socket.id,'has joined at :',timeStamp)
  console.log("We have %s sockets in the array",connections.length)

  socket.on('join', clientPayload => {
    const newMember = {
      id:socket.id,
      name:clientPayload.name,
      vote:clientPayload.userAnswer,
      }
      audience.push(newMember)
      console.log(audience);
      console.log('newMember',newMember);
  })

  const payload1 = {
    question:"What is the Best Pizza?!",
    answers:[
      {text:"Vegetarian  pizza",id:"A"},
      {text:"Tuna pizza",id:"B"},
      {text:"Thai Chicken Pizza",id:"C"},
      {text:"MARGHERITA pizza",id:"D"}
    ],
    time:timeStamp,
    id:socket.id
  }
  const payload2 = {
    question:"Name a color",
  answers:[
    {text:"Blue ",id:"A"},
    {text:"Red",id:"B"},
    {text:"White",id:"C"},
    {text:"Black",id:"D"}
  ],
  time:timeStamp,
  id:socket.id}
  socket.emit('poll-1',payload1);
  socket.emit('poll-2',payload2);

  // Welcome and Scoreboard emit

  socket.emit('welcome',{
    title:title,
    audience:audience,
    results:results
  })

  //Handle disconnect
  socket.on('disconnect',() => {
    connections.splice(connections.indexOf(socket),1)
    socket.disconnect()
    const timeStamp = new Date().toLocaleTimeString()
    console.log(socket.id," has left at :",timeStamp);
    console.log("We have %s sockets in the array",connections.length)
  })
})


http.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))
