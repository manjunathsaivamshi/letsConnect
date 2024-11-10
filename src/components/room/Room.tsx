import { useEffect, useState } from 'react';
import Peer from 'peerjs';
import VideoCard from './VideoCard'; // Import your VideoCard component
import { useParams } from 'react-router-dom';

interface remotestreamtype {
   [key: string]: MediaStream | null;
}

const Room = () => {
  const params  = useParams();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [joinedPeerId, setJoinedPeerId] = useState("");
  const [remoteStreams, setRemoteStreams] = useState<remotestreamtype>({});
  const roomId = params.id;
  const byJoin = params.byJoin;

  const handleAnswercall = (newPeer:Peer)=>{
        newPeer.on('call', (call) => {
        // Answer incoming call
        if(stream!=null)
          call.answer(stream);
        call.on('stream', (remoteStream) => {
          setRemoteStreams((prevStreams) => ({
            ...prevStreams,
            [call.peer]: remoteStream,
          }));
        });
      });
    }

  const handleDailCall =(newPeer:Peer,roomId:string,userStream:MediaStream)=>{
    const call = newPeer.call(roomId, userStream);
    // if(userStream!=null)
    //     call.answer(userStream);
    call.on('stream', (remoteStream) => {
      setRemoteStreams((prevStreams) => ({
        ...prevStreams,
        [call.peer]: remoteStream,
      }));
    });
  }

  useEffect(() => {

    console.log('Joined room with ID:', roomId);
    if(roomId){
      if(byJoin=="1"){
        const newPeer = new Peer();
        
        newPeer.on('open',(id)=>{
          setJoinedPeerId(id);
        })
        console.log("joined")
           // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        setStream(userStream);
      });

        if(stream)
          handleDailCall(newPeer,roomId,stream);
        handleAnswercall(newPeer);
      }
      else{
      const newPeer = new Peer(roomId);
         // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        setStream(userStream);
      });
      handleAnswercall(newPeer);
  }
  }
  }, [remoteStreams]);

  return (
    <div style={{display:'grid'}}>
      <h2>Room: {roomId}</h2>
      <VideoCard peerId={"local"} isLocal={true} stream={stream} />
      {Object.entries(remoteStreams).map(([peerId, remoteStream]) => (
        <VideoCard key={peerId} peerId={peerId} isLocal={false} stream={remoteStream} />
      ))}
    </div>
  );
};

export default Room;
