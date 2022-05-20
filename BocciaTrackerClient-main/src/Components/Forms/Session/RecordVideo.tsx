import { useState, useEffect, useRef } from "react";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
  StatusMessages,
} from "react-media-recorder";
import "./RecordVideo.scss";
import { Button } from "@material-ui/core";

export default function RecordVideo(props) {
  console.log("first props", props);
  const VideoPreview = ({
    stream,
    width = 300,
    status,
  }: {
    stream: MediaStream | null;
    width: number;
    status: StatusMessages;
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);

    return !stream ? null : (
      <video className={status} ref={videoRef} width={width} autoPlay />
    );
  };
  
  const [blobURL, setBlobURL] = useState(null);
  const RecordView = (props) => {
    console.log("second props", props);
    const {
      status,
      startRecording,
      stopRecording,
      mediaBlobUrl,
      previewStream,
    } = useReactMediaRecorder({
      video: true,
      onStop: (blobUrl, blob) => {
        var file = new File([blob], "name.mpeg");
        const url = URL.createObjectURL(blob);
        let video = new FormData();
        video.append("file", blob, "-Red.mp4");
        props.handleGetVideo(video);
        setBlobURL(blobUrl);
        console.log("blob url", blobUrl);
      },

    });

    console.log("mediaBlobUrl", mediaBlobUrl);

    const [isRecording, setIsRecording] = useState(false);
    const handleStartRecording = () => {
      setIsRecording(true);
      startRecording();
    };
    const handleStopRecording = () => {
      setIsRecording(false);
      stopRecording();
    };
    return (
      <div>
        <h2>Status: {status}</h2>
        <Button onClick={() => handleStartRecording()}>Start Recording</Button>
        <Button onClick={() => handleStopRecording()}>Stop Recording</Button>
        {isRecording && <VideoPreview stream={previewStream} width={300} />}
        {!isRecording && (
          <video id="recorded" src={blobURL} controls autoPlay width={300} />
        )}
      </div>
    );
  };

  return (
    <RecordView
      handleGetVideo={props.handleGetVideo}
      onStop={(blobUrl, blob) => {
        console.log(blob);
      }}
    />
  );
}
