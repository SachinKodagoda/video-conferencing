import { AnimationContext } from '@ctx/AnimationContext';
import MainBottomBar from '@layouts/MainBottomBar';
import MainLeftBar from '@layouts/MainLeftBar';
import MainMiddleArea from '@layouts/MainMiddleArea';
import MainMiddlePlaceHolder from '@layouts/MainMiddlePlaceHolder';
import MainRightBar from '@layouts/MainRightBar';
import styles from '@pages_style/index.module.sass';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { drawFullHand, getHandCenter } from '@util/handPose';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Index = (): JSX.Element => {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [showLeftBar, setShowLeftBar] = useState(true);
  const [showRightBar, setShowRightBar] = useState(true);
  const { setContainerHeight, setContainerWidth, setVideoHeight, setVideoWidth, setX, setY, setZoom, setZoomAngle } =
    useContext(AnimationContext);

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
      net
    ) {
      const { videoWidth } = videoReference;
      const { videoHeight } = videoReference;
      videoReference.width = videoWidth;
      videoReference.height = videoHeight;
      canvasReference.width = videoWidth;
      canvasReference.height = videoHeight;
      setVideoWidth(videoWidth);
      setVideoHeight(videoHeight);

      const hand = await net.estimateHands(videoReference);
      const ctx = canvasReference.getContext('2d');
      if (ctx) {
        drawFullHand(ctx, hand);
        // markCanvasCorners(ctx, videoWidth, videoHeight);
        const xyValues = getHandCenter(hand);
        if (xyValues.primaryAngle !== null) {
          setZoomAngle(xyValues.primaryAngle);
          setZoom(true);
        } else {
          setZoom(false);
        }

        if (xyValues.xVal !== null && xyValues.yVal !== null) {
          setX(xyValues.xVal);
          setY(xyValues.yVal);
        }
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
      setContainerWidth(containerRefs.clientWidth);
      setContainerHeight(containerRefs.clientHeight);
    }
  }, [setContainerHeight, setContainerWidth]);

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <div className={styles.videoContainerInner}>
          {showLeftBar && <MainLeftBar />}
          <div ref={containerRef} className={styles.videoMenuMiddle}>
            {videoOn ? <MainMiddleArea canvasRef={canvasRef} webcamRef={webcamRef} /> : <MainMiddlePlaceHolder />}
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
