import io from 'socket.io-client';

const socketUrl = 'https://stun-server.hopto.org';

export default io(socketUrl, { path: '/socket', transports: ['websocket', 'polling'] });
