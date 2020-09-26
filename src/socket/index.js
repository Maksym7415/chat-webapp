import io from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

const soketUrl = process.env.NODE_ENV === 'production' ? process.env.SOCKET_URL_PROD : process.env.SOCKET_URL_DEV;

export default io(soketUrl, { path: '/socket', transports: ['websocket', 'polling'] });
