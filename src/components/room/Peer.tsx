import { useState, useEffect } from 'react';
import Peer from 'peerjs';

const PeerComponent = () => {
  const [peerId, setPeerId] = useState('');

  useEffect(() => {
    // Initialize PeerJS
    const newPeer = new Peer({
      host: 'localhost',
      port: 4500,
      path: '/peerjs',
      secure: false, // Change to true if using HTTPS
    });

    newPeer.on('open', id => {
      console.log('My peer ID is: ' + id);
      setPeerId(id);
    });

    newPeer.on('connection', incomingConn => {
      console.log('Connected to peer:', incomingConn.peer);
      incomingConn.on('data', data => {
        console.log('Received data:', data);
      });
    });
  }, []);

//   const connectToPeer = (peerId) => {
//     if (peer) {
//       const connection = peer.connect(peerId);
//       connection.on('open', () => {
//         console.log('Connected to peer:', peerId);
//         connection.send('Hello from ' + peerId);
//       });

//       connection.on('data', (data) => {
//         console.log('Received data from peer:', data);
//       });

//       setConn(connection);
//     }
//   };

  return (
    <div>
      <h1>PeerJS ID: {peerId}</h1>
    </div>
  );
};

export default PeerComponent;
