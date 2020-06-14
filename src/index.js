const gkm = require('gkm');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`listening at: ${port}`);
})

const commandQueue = []

  const getCommand = () => {
      console.log(commandQueue)
    if (commandQueue.length === 0) return ''
    const command = commandQueue.pop()
    return command
  }

  const keyPressed = (key) => {
      if (key[0] === 'F1') commandQueue.push('utamo vita')
  }

  const check = (data, socket) => {
    socket.emit('reminder', getCommand())
    // socket.broadcast.emit('reminder', 'utamo vita')
  }


gkm.events.on('key.*', function(key) {
    if (this.event === 'key.pressed') {
        keyPressed(key)
    }
});

io.on('connection', (socket) => {
    socket.on('check-status', data => check(data, socket));
});