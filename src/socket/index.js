import io from 'socket.io-client';

const socketUrl = 'https://stun-server.hopto.org';

// const socketUrl = process.NODE_ENV === 'production' ? process.env.SOCKET_URL_PROD : process.env.SOCKET_URL_DEV;

export default io(socketUrl, { path: '/socket', transports: ['websocket', 'polling'] });
