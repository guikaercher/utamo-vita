require('dotenv').config()
const gkm = require('gkm');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`listening at: ${port}`);
})

const {
    UTAMO_VITA_KEY
} = process.env

const commandQueue = []

  const getCommand = () => {
      console.log(commandQueue)
    if (commandQueue.length === 0) return null
    const command = commandQueue.pop()
    console.log(`command: ${command}`);
    return command
  }

  const keyPressed = (key) => {
      switch (key[0]) {
        case UTAMO_VITA_KEY:
            const command = 'utamo vita'
            const lastCommand = commandQueue[commandQueue.length - 1]
            if (command !== lastCommand) commandQueue.push(command)
            break
        default:
            break
      }
  }

  const check = (data, socket) => {
    socket.emit('reminder', getCommand())
    // socket.broadcast.emit('reminder', 'utamo vita')
  }


gkm.events.on('key.*', function(key) {
    // Will only trigger on release
    if (this.event === 'key.pressed') {
        keyPressed(key)
    }
});

io.on('connection', (socket) => {
    socket.on('check-status', data => check(data, socket));
});