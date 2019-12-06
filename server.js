/**
 * @Author: Ali
 * @Date:   2019-12-04T15:34:56+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-12-06T12:25:12+01:00
 */
const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const PORT = process.env.port || 5000
let connections = []
app.get('/',(req,res)=>{
  res.send('Hello SOCKER!!')
})

io.on('connection', socket => {
  connections.push(socket)
  const timeStamp = new Date().toLocaleTimeString()

  console.log('someone has joined at :',timeStamp)
  console.log("We have %s socket in the array",connections.length);

  const payload = {
    question:"What is the Best Pizza?!",
    answers:[
      {text:"vegetarian  pizza",id:"A"},
      {text:"Tuna pizza",id:"B"},
      {text:"THAI CHICKEN Pizza",id:"C"},
      {text:"MARGHERITA pizza",id:"D"}
    ],
    time:timeStamp,
    id:socket.id
  }
  socket.emit('poll-1',payload);
  socket.on('client', data => console.log(data))

  //Handle disconnect
  socket.on('disconnect',() => {
    connections.splice(connections.indexOf(socket),1)
    const timeStamp = new Date().toLocaleTimeString()
    console.log("someone has left at :",timeStamp);
    console.log("We have %s socket in the array",connections.length)
  })
})


http.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))
