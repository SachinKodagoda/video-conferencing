import { useRef, useState } from "react";
import styled from "styled-components";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";

const Body = (): JSX.Element | null => {
  const [playing, setPlaying] = useState(false);
  const videoObjectRef = useRef<null | HTMLVideoElement>(null);

  const startVideo = () => {
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        if (videoObjectRef) {
          const { current } = videoObjectRef;
          const videoElement = (current as unknown) as HTMLMediaElement;
          videoElement.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = () => {
    setPlaying(false);
    if (videoObjectRef) {
      const { current } = videoObjectRef;
      const videoElement = (current as unknown) as HTMLMediaElement;
      (videoElement.srcObject as MediaStream)?.getTracks()[0].stop();
    }
  };

  return (
    <Container>
      <div className="videoContainer">
        <video
          height="100%"
          width="100%"
          muted
          autoPlay
          className="videoObject"
          ref={videoObjectRef}
        />
      </div>
      <div className="actionButtons">
        {playing ? (
          <button onClick={stopVideo}>Stop</button>
        ) : (
          <button onClick={startVideo}>Start</button>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  background: #000;
  position: relative;
  .videoContainer {
    width: 100vw;
    height: 100vh;
  }

  .actionButtons {
    position: absolute;
    top: 20px;
    left: 20px;
  }
`;

export default Body;
