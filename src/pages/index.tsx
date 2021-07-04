import MainBottomBar from '@layouts/MainBottomBar';
import MainLeftBar from '@layouts/MainLeftBar';
import MainMiddleArea from '@layouts/MainMiddleArea';
import MainMiddlePlaceHolder from '@layouts/MainMiddlePlaceHolder';
import MainRightBar from '@layouts/MainRightBar';
import styles from '@pages_style/index.module.sass';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { drawHandCenter } from '@util/handPose';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

type TXyType = {
  x: number;
  y: number;
};

const Index = (): JSX.Element => {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [showLeftBar, setShowLeftBar] = useState(true);
  const [showRightBar, setShowRightBar] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [videoSize, setVideoSize] = useState({
    width: 0,
    height: 0,
  });
  const [xy, setXY] = useState<TXyType>({
    x: 0,
    y: 0,
  });

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
      const { videoWidth } = videoReference;
      const { videoHeight } = videoReference;
      videoReference.width = videoWidth;
      videoReference.height = videoHeight;
      canvasReference.width = videoWidth;
      canvasReference.height = videoHeight;
      setVideoSize({
        width: videoWidth,
        height: videoHeight,
      });

      const hand = await net.estimateHands(videoReference);
      const ctx = canvasReference.getContext('2d');
      if (ctx) {
        // drawHand(ctx, hand);
        const xyValues = drawHandCenter(ctx, hand);
        if (xyValues.xVal && xyValues.yVal) {
          setXY({
            x: xyValues.xVal,
            y: xyValues.yVal,
          });
        }
      }
    }
  };

  useEffect(() => {
    const containerRefs = containerRef?.current as HTMLDivElement;
    if (containerRefs) {
      setContainerWidth(containerRefs.clientWidth);
      setContainerHeight(containerRefs.clientHeight);
    }
    runHandpose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <div className={styles.videoContainerInner}>
          {showLeftBar && <MainLeftBar />}
          <div ref={containerRef} className={styles.videoMenuMiddle}>
            {videoOn ? (
              <MainMiddleArea
                canvasRef={canvasRef}
                webcamRef={webcamRef}
                containerWidth={containerWidth}
                containerHeight={containerHeight}
                xy={xy}
                videoSize={videoSize}
              />
            ) : (
              <MainMiddlePlaceHolder />
            )}
          </div>
          {showRightBar && <MainRightBar />}
        </div>
      </div>
      <MainBottomBar
        videoOn={videoOn}
        showLeftBar={showLeftBar}
        showRightBar={showRightBar}
        setVideoOn={val => setVideoOn(val)}
        setShowLeftBar={val => setShowLeftBar(val)}
        setShowRightBar={val => setShowRightBar(val)}
      />
    </div>
  );
};

export default Index;
