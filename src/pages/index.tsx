import Box from '@components/Box';
import styles from '@pages_style/index.module.sass';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { leftTopToCenter } from '@util/common';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Index = (): JSX.Element => {
  const [threeMenuOn, setThreeMenuOn] = useState(false);
  const [settingsMenuOn, setSettingsMenuOn] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [screenWidth, setScreenWidth] = useState(10);
  const [screenHeight, setScreenHeight] = useState(10);
  const [fullSize, setFullSize] = useState({
    width: 0,
    height: 0,
  });

  const [streaming, setStreaming] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [microphoneOn, setMicrophoneOn] = useState(false);

  const [showLeftBar, setShowLeftBar] = useState(true);
  const [showRightBar, setShowRightBar] = useState(true);

  const threeMenuIcon = threeMenuOn ? '3dActive' : '3d';
  const settingsMenuIcon = settingsMenuOn ? 'settingsActive' : 'settings';

  const videoIcon = videoOn ? 'videoCameraActive' : 'videoCamera';
  const streamingIcon = streaming ? 'streamingActive' : 'streaming';
  const microphoneIcon = microphoneOn ? 'microphoneActive' : 'microphone';

  const usersIcon = showLeftBar ? 'groupActive' : 'group';
  const messageIcon = showRightBar ? 'messageActive' : 'message';
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const messageArray = [
    {
      message: 'Hi',
      time: '',
    },
    {
      message: 'Test',
      time: '',
    },
  ];

  const runHandpose = async () => {
    const net = await handpose.load();
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10); // 10
  };

  const detect = async (net: handpose.HandPose) => {
    const videoReference = webcamRef?.current?.video as HTMLVideoElement;
    const canvasReference = canvasRef?.current as HTMLCanvasElement;
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      videoReference.readyState === 4 &&
      net &&
      typeof containerRef.current !== 'undefined' &&
      containerRef.current !== null
    ) {
      // // Set video width
      // videoReference.width = containerRef.current.clientWidth;
      // videoReference.height = containerRef.current.clientHeight;
      // // Set canvas height
      // canvasReference.width = containerRef.current.clientWidth;
      // canvasReference.height = containerRef.current.clientHeight;
      // Get video properties
      const { videoWidth } = videoReference;
      const { videoHeight } = videoReference;
      // Set video width
      videoReference.width = videoWidth;
      videoReference.height = videoHeight;
      // Set canvas height
      canvasReference.width = videoWidth;
      canvasReference.height = videoHeight;
      setFullSize({
        width: videoWidth,
        height: videoHeight,
      });

      // eslint-disable-next-line no-console
      // console.log(': =-->', containerRef.current.clientWidth, containerRef.current.clientHeight);
      // Make Detections
      const hand = await net.estimateHands(videoReference);
      // Draw mesh
      const ctx = canvasReference.getContext('2d');
      if (ctx) {
        // drawHand(hand, ctx);
        if (hand.length > 0) {
          const predicted = hand[0].landmarks;
          if (predicted.length > 0) {
            const xMidSum = predicted[0][0] + predicted[5][0] + predicted[17][0];
            const yMidSum = predicted[0][1] + predicted[5][1] + predicted[17][1];
            const xVal = parseFloat((xMidSum / 3).toFixed(4));
            const yVal = parseFloat((yMidSum / 3).toFixed(4));
            ctx.beginPath();
            ctx.arc(xVal, yVal, 10, 0, 3 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
            setX(xVal);
            setY(yVal);
          }
        }
        // ctx.beginPath();
        // ctx.arc(videoWidth / 2, videoHeight / 2, 10, 0, 3 * Math.PI);
        // ctx.fillStyle = 'green';
        // ctx.fill();
        // ctx.beginPath();
        // ctx.arc(0, 0, 10, 0, 3 * Math.PI);
        // ctx.fillStyle = 'blue';
        // ctx.fill();
        // ctx.beginPath();
        // ctx.arc(videoWidth, videoHeight, 10, 0, 3 * Math.PI);
        // ctx.fillStyle = 'yellow';
        // ctx.fill();
        // ctx.beginPath();
        // ctx.arc(0, videoHeight, 10, 0, 3 * Math.PI);
        // ctx.fillStyle = 'pink';
        // ctx.fill();
        // ctx.beginPath();
        // ctx.arc(videoWidth, 0, 10, 0, 3 * Math.PI);
        // ctx.fillStyle = 'white';
        // ctx.fill();
        // ctx.beginPath();
        // ctx.arc(videoWidth / 2, 0, 10, 0, 3 * Math.PI);
        // ctx.fillStyle = 'white';
        // ctx.fill();
        // ctx.beginPath();
        // ctx.arc(videoWidth / 2, videoHeight, 10, 0, 3 * Math.PI);
        // ctx.fillStyle = 'white';
        // ctx.fill();
      }
    }
  };

  useEffect(() => {
    runHandpose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const containerRefs = containerRef?.current as HTMLDivElement;
    if (containerRefs) {
      setScreenWidth(containerRefs.clientWidth);
      setScreenHeight(containerRefs.clientHeight);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <div className={styles.videoContainerInner}>
          {showLeftBar && (
            <div className={styles.videoMenuLeft}>
              <div className={styles.videoItem}>D.G.Kodagoda</div>
              <div className={styles.videoItem}>Y.Abinaya</div>
              <div className={styles.videoItem}>Y.R.Kodagoda</div>
              <div className={styles.videoItem}>S.Kodagoda</div>
              <div className={styles.videoItem}>I.Kumarasinghe</div>
              <div className={styles.videoItem}>Thilina</div>
              <div className={styles.videoItem}>User1</div>
              <div className={styles.videoItem}>User2</div>
              <div className={styles.videoItem}>User3</div>
              <div className={styles.videoItem}>User4</div>
              <div className={styles.videoItem}>User5</div>
              <div className={styles.videoItem}>User6</div>
            </div>
          )}

          <div ref={containerRef} className={styles.videoMenuMiddle}>
            {videoOn ? (
              <>
                <Webcam
                  ref={webcamRef}
                  className={styles.videoObject}
                  screenshotFormat='image/jpeg'
                  mirrored
                  width={screenWidth}
                  height={screenHeight}
                  videoConstraints={{ width: screenWidth, height: screenHeight }}
                />
                <canvas ref={canvasRef} className={styles.canvasObject} />
                <Canvas className={styles.newCanvas}>
                  <OrbitControls />
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <Box
                    position={[leftTopToCenter(x, fullSize.width, 100), leftTopToCenter(y, fullSize.height, 100), 0]}
                  />
                </Canvas>
                {/* <Three x={x} y={y} width={fullSize.width} height={fullSize.height} fullSize={fullSize} /> */}
              </>
            ) : (
              <div className={styles.videoPlaceholder}>
                <div className={styles.userName}>Duminda Kodagoda</div>
                <div className={styles.userMessage}>Your video is off!</div>
              </div>
            )}
          </div>
          {showRightBar && (
            <div className={styles.videoMenuRight}>
              <div className={styles.chatItemCover}>
                {messageArray.map((item, index) => (
                  <div key={`chatItem-${index + 1}`} className={styles.chatItem}>
                    {item.message}
                  </div>
                ))}
              </div>
              <div className={styles.chatInput}>
                <input type='text' className={styles.chatInputItem} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.left}>
          <img
            src={`/images/${threeMenuIcon}.svg`}
            alt=''
            className={styles.leftIcons}
            onMouseEnter={() => {
              setThreeMenuOn(true);
            }}
            onMouseLeave={() => {
              setThreeMenuOn(false);
            }}
          />
          <img
            src={`/images/${settingsMenuIcon}.svg`}
            alt=''
            className={styles.leftIcons}
            onMouseEnter={() => {
              setSettingsMenuOn(true);
            }}
            onMouseLeave={() => {
              setSettingsMenuOn(false);
            }}
            aria-hidden='true'
          />
        </div>
        <div className={styles.middle}>
          <img
            src={`/images/${videoIcon}.svg`}
            alt=''
            className={styles.middleIcons}
            onClick={() => {
              const tempState = videoOn;
              setVideoOn(!tempState);
            }}
            aria-hidden='true'
          />
          <img
            src={`/images/${streamingIcon}.svg`}
            alt=''
            className={styles.middleIcons}
            onClick={() => {
              setStreaming(!streaming);
            }}
            aria-hidden='true'
          />
          <img
            src={`/images/${microphoneIcon}.svg`}
            alt=''
            className={styles.middleIcons}
            onClick={() => {
              setMicrophoneOn(!microphoneOn);
            }}
            aria-hidden='true'
          />
        </div>
        <div className={styles.right}>
          <img
            src={`/images/${usersIcon}.svg`}
            alt=''
            className={styles.rightIcons}
            onClick={() => {
              setShowLeftBar(!showLeftBar);
            }}
            aria-hidden='true'
          />
          <img
            src={`/images/${messageIcon}.svg`}
            alt=''
            className={styles.rightIcons}
            onClick={() => {
              setShowRightBar(!showRightBar);
            }}
            aria-hidden='true'
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
