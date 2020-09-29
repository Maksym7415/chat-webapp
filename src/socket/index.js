import io from 'socket.io-client';

export default io(process.env.REACT_APP_SOCKET_URL, { path: '/socket', transports: ['websocket', 'polling'] });
