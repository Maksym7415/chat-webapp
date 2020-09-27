import io from 'socket.io-client';

const socketUrl = 'http://localhost:5050';

// const socketUrl = process.NODE_ENV === 'production' ? process.env.SOCKET_URL_PROD : process.env.SOCKET_URL_DEV;

export default io(process.env.REACT_APP_SOCKET_URL, { path: '/socket', transports: ['websocket', 'polling'] });
