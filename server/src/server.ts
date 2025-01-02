import app from './main';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import setupSocket from './setupSocket';

dotenv.config();

const PORT = process.env.PORTCONNECT || 3042;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

setupSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
