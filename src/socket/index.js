import io from 'socket.io-client';

export default io('http://localhost:8081');

// socket for remote connection

// export default io('http://10.4.30.172:8081');