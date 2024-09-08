import { useRef, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { videoCard } from '../types/VideoCard';

const VideoCard = (props: videoCard) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = props.stream;
    }
  }, [props.stream]);

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="video"
        ref={videoRef}
        autoPlay
        muted={props.isLocal}
        sx={{ height: 200 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.isLocal ? 'You' : `User ${props.peerId}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
