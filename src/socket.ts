import   { Server , Socket} from 'socket.io';

// In-memory data to simulate connected users and rooms (replace this with database storage in a real application)
const rooms: { [roomId: string]: string[] } = {};

const setupSocket = ( io:Server ) => {

    io.on('connection',( socket:Socket ) => { 

        console.log('A user connected');

          // Event for creating/joining a room
            socket.on('join-room', (roomId: string, userId: string) => {
                socket.join(roomId);
        
                // Store the user ID in the room's connected users list
                if (!rooms[roomId]) {
                rooms[roomId] = [];
                }
                rooms[roomId].push(userId);
        
                // Notify other users in the room about the new user
                socket.to(roomId).emit('user-joined', userId, rooms[roomId]);
        
                // Send the list of connected users to the newly joined user
                socket.emit('user-list', rooms[roomId]);
            });


                // Event for handling signaling messages
            socket.on('signal', (roomId: string, userId: string, signal: any) => {
                // Broadcast the signaling message to the other user(s) in the room
                socket.to(roomId).emit('signal', userId, signal);
             });

             socket.on('disconnect', () => {
                console.log('A user disconnected');
          
                // Find the room where the user was connected
                for (const roomId in rooms) {
                  const index = rooms[roomId].indexOf(socket.id);
                  if (index !== -1) {
                    const userId = rooms[roomId][index];
                    rooms[roomId].splice(index, 1);
          
                    // Notify other users in the room about the disconnected user
                    socket.to(roomId).emit('user-left', userId, rooms[roomId]);
                    break;
                  }
                }
            });

    });

}


export default setupSocket;