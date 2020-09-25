import io from 'socket.io-client';

export default io('https://stun-server.hopto.org/chat', {
  path: '/chat',
  transports: ['polling', 'websocket'],
});

// socket for remote connection

// export default io('http://10.4.30.172:8081');
