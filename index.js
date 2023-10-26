const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const socketService = require('./services/chat.service')

global.__basedir = __dirname
global._io = io

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });

// use middleware express (C1) connect socket
// app.use((req, res, next) => {
//     res.io = io
//     next()
// })

app.use(require('./routes/chat.route'))

global._io.use((socket, next) => {
  // check jwt
  const { token } = socket.handshake.headers
  // use lib jsonwebtoken
  if (token && token === "bear::123") {
    return next()
  }
  next(new Error('Please login'))
})

global._io.on('connection', socketService.connection)

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});
