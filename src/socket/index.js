import io from 'socket.io-client';

const soketUrl = process.env.NODE_ENV === 'production' ? process.env.SOCKET_URL_PROD : process.env.SOCKET_URL_DEV;

export default io(soketUrl, { path: '/socket', transports: ['websocket', 'polling'] });
