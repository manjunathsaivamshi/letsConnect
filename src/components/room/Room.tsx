import { useEffect, useState } from 'react';
import Peer from 'peerjs';
import VideoCard from './VideoCard'; // Import your VideoCard component
import { useParams } from 'react-router-dom';
import {socket} from '../../soc'

interface remotestreamtype {
   [key: string]: MediaStream | null;
}
function generateRandomString() {
    return Array.from({ length: 4 }, () => 
        String.fromCharCode(97 + Math.floor(Math.random() * 26))
    ).join('');
}

const Room = () => {
  const params = useParams();
  const roomId = params.id;
  const userId = params.userId;
  const [myPeer, setMyPeer] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [remoteStreams, setRemoteStreams] = useState<Record<string,MediaStream>>({});
  const [roomUsers, setRoomUsers] = useState({});
  const userName = generateRandomString();

  useEffect(() => {
        if(!userId) return;
        const peer = new Peer(userId,{
          host: 'localhost',  // PeerJS server host
          port: 5500,         // Port where the PeerJS server is running
          path: '/',
        });
        peer.on('open', () => {
          console.log('Peer connected with ID:', peer.id); // Now peer.id should be available
          setMyPeer(peer);  // Set the peer once it's connected
        });
        socket.emit("join-room", { roomId: roomId, peerId: userId, userName: userName });  
        try {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream);
                });
        } 
        catch (error) {
            console.error(error);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  useEffect(() => {
    if(!stream) return;
    if(!myPeer) return;

    socket.on("user-joined", ({peerId, userName}) => {
        console.log(peerId,userName)
        
        const call = myPeer.call(peerId, stream);
        call.on("stream", (peerStream) => {
            setRemoteStreams(remoteStreams =>({
              ...remoteStreams,
              [call.peer]: peerStream
            }));
        });

    });
    
    myPeer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
          setRemoteStreams(remoteStreams =>({
            ...remoteStreams,
            [call.peer]: peerStream
          }));
      });
  });
    }, [myPeer,stream]);

  return (
    <div style={{display:'grid'}}>
      <h2>Room: {roomId}</h2>
      <VideoCard userName={userId} stream={stream?stream:null}/>
      {Object.entries(remoteStreams).map(([peerId, peerStream])=>(
        <VideoCard userName={peerId} stream={peerStream?peerStream:null}/>
      ))}
    </div>
  );
};

export default Room;
