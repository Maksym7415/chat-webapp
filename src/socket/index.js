import io from 'socket.io-client';

export default io('https://stun-server.hopto.org', { path: '/socket', transports: ['websocket', 'polling'] });

// socket for remote connection

// export default io('http://10.4.30.172:8081');
