// src/index.ts
import express from 'express';
import cors from 'cors';
import  { Server } from 'socket.io';
// import setupSocket from './socket';
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());


const io = new Server(httpServer, { /* options */ });
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});





// setupSocket(io) 

app.get('/',(req,res,next)=>{
    res.send('hello server')
})


// Start the server

const PORT  = process.env.PORT || 8080



httpServer.listen( PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});
