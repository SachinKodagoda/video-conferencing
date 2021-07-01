import styles from '@pages_style/index.module.sass';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { drawHand } from '@util/utilities';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as THREE from 'three';

const Index = (): JSX.Element => {
  const [threeMenuOn, setThreeMenuOn] = useState(false);
  const [settingsMenuOn, setSettingsMenuOn] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    }, 10);
  };

  const detect = async (net: handpose.HandPose) => {
    const videoReference = webcamRef?.current?.video as HTMLVideoElement;
    const canvasReference = canvasRef?.current as HTMLCanvasElement;
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      videoReference.readyState === 4 &&
      net
    ) {
      // Get video properties
      const { videoWidth } = videoReference;
      const { videoHeight } = videoReference;
      // Set video width
      videoReference.width = videoWidth;
      videoReference.height = videoHeight;
      // Set canvas height
      canvasReference.width = videoWidth;
      canvasReference.height = videoHeight;
      // Make Detections
      const hand = await net.estimateHands(videoReference);
      // Draw mesh
      const ctx = canvasReference.getContext('2d');
      if (ctx) {
        drawHand(hand, ctx);
      }
    }
  };

  useEffect(() => {
    runHandpose();
    // Scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    setPages({ scene, camera, renderer });
    camera.position.z = 60;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <div className={styles.videoMenuMiddle} style={{ marginLeft: showLeftBar ? '20px' : '0px' }}>
            {videoOn ? (
              <>
                <Webcam ref={webcamRef} className={styles.videoObject} />
                <canvas ref={canvasRef} className={styles.canvasObject} />
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
