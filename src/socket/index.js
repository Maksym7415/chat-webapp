import io from 'socket.io-client';

export default io('https://stun-server.hopto.org', {
  path: '/chat',
  transports: ['polling', 'websocket'],
});

// socket for remote connection

// export default io('http://10.4.30.172:8081');
