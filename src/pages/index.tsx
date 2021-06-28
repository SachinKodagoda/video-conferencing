import styles from '@pages_style/design.module.sass';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { drawHand } from '@util/utilities';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

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
    console.log('Handpose model loaded.');
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net: any) => {
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
      drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);
  return (
    <div showLeftBar={showLeftBar} streaming={streaming} className={styles.container}>
      <div className='videoContainer'>
        <div className='videoContainerInner'>
          {showLeftBar && (
            <div className='videoMenuLeft'>
              <div className='videoItem'>D.G.Kodagoda</div>
              <div className='videoItem'>Y.Abinaya</div>
              <div className='videoItem'>Y.R.Kodagoda</div>
              <div className='videoItem'>S.Kodagoda</div>
              <div className='videoItem'>I.Kumarasinghe</div>
              <div className='videoItem'>Thilina</div>
              <div className='videoItem'>User1</div>
              <div className='videoItem'>User2</div>
              <div className='videoItem'>User3</div>
              <div className='videoItem'>User4</div>
              <div className='videoItem'>User5</div>
              <div className='videoItem'>User6</div>
            </div>
          )}

          <div className='videoMenuMiddle'>
            {videoOn ? (
              <>
                <Webcam ref={webcamRef} className='videoObject' />
                <canvas ref={canvasRef} className='canvasObject' />
              </>
            ) : (
              <div className='videoPlaceholder'>
                <div className='userName'>Duminda Kodagoda</div>
                <div className='userMessage'>Your video is off!</div>
              </div>
            )}
          </div>
          {showRightBar && (
            <div className='videoMenuRight'>
              <div className='chatItemCover'>
                {messageArray.map((item, index) => (
                  <div className='chatItem' key={`chatItem-${index + 1}`}>
                    {item.message}
                  </div>
                ))}
              </div>
              <div className='chatInput'>
                <input type='text' className='chatInputItem' />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='bottomBar'>
        <div className='left'>
          <span
            className='hoverIconCover'
            onMouseEnter={() => {
              setThreeMenuOn(true);
            }}
            onMouseLeave={() => {
              setThreeMenuOn(false);
            }}>
            <img src={`/images/${threeMenuIcon}.svg`} alt='' className='iconBottomBar' />
          </span>
          <span className='hoverIconCover'>
            <img
              src={`/images/${settingsMenuIcon}.svg`}
              alt=''
              className='iconBottomBar'
              onMouseEnter={() => {
                setSettingsMenuOn(true);
              }}
              onMouseLeave={() => {
                setSettingsMenuOn(false);
              }}
            />
          </span>
        </div>
        <div className='middle'>
          <img
            src={`/images/${videoIcon}.svg`}
            alt=''
            className='iconBottomBar'
            onClick={() => {
              const tempState = videoOn;
              setVideoOn(!tempState);
            }}
          />
          <img
            src={`/images/${streamingIcon}.svg`}
            alt=''
            className='iconBottomBar'
            onClick={() => {
              setStreaming(!streaming);
            }}
          />
          <img
            src={`/images/${microphoneIcon}.svg`}
            alt=''
            className='iconBottomBar'
            onClick={() => {
              setMicrophoneOn(!microphoneOn);
            }}
          />
        </div>
        <div className='right'>
          <img
            src={`/images/${usersIcon}.svg`}
            alt=''
            className='iconBottomBar'
            onClick={() => {
              setShowLeftBar(!showLeftBar);
            }}
          />
          <img
            src={`/images/${messageIcon}.svg`}
            alt=''
            className='iconBottomBar'
            onClick={() => {
              setShowRightBar(!showRightBar);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
