import { Server } from 'socket.io';
import Chart from './chart';

const setupSocket = (io: Server): void => {
  const chart = new Chart();
  chart.setupSocket(io);
};

export default setupSocket;
