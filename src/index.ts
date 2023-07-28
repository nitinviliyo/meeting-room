// src/index.ts
import express from 'express';
import cors from 'cors';
import  { Server } from 'socket.io';
// import setupSocket from './socket';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Middleware
app.use(cors());



// setupSocket(io) 

app.get('/',(req,res,next)=>{
    res.send('hello server')
})


// Start the server

const PORT  = process.env.PORT || 8080




app.listen( PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});
