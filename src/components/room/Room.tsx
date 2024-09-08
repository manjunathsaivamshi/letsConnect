import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';
import VideoCard from './VideoCard'; // Import your VideoCard component

const Room = () => {
  const { roomId } = useParams();
  const [stream, setStream] = useState(undefined);
  const [remoteStreams, setRemoteStreams] = useState({});

  useEffect(() => {
    // Initialize PeerJS instance
    const newPeer = new Peer(); // Use PeerJS cloud service

    newPeer.on('open', (id) => {
      console.log('Joined room with ID:', id);
    });

    newPeer.on('call', (call) => {
      // Answer incoming call
      call.answer(stream);
      call.on('stream', (remoteStream) => {
        setRemoteStreams((prevStreams) => ({
          ...prevStreams,
          [call.peer]: remoteStream,
        }));
      });
    });

    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        setStream(userStream);

        // Handle local stream
        const localVideo = document.createElement('video');
        localVideo.srcObject = userStream;
        localVideo.autoplay = true;
        localVideo.muted = true;
        document.body.appendChild(localVideo);

        // Call the room's peer ID
        const call = newPeer.call(roomId, userStream);
        call.on('stream', (remoteStream) => {
          setRemoteStreams((prevStreams) => ({
            ...prevStreams,
            [call.peer]: remoteStream,
          }));
        });
      });

    setPeer(newPeer);

    return () => {
      newPeer.destroy();
    };
  }, [roomId]);

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <VideoCard peerId="local" isLocal={true} stream={stream} />
      {Object.entries(remoteStreams).map(([peerId, remoteStream]) => (
        <VideoCard key={peerId} peerId={peerId} isLocal={false} stream={remoteStream} />
      ))}
    </div>
  );
};

export default Room;
