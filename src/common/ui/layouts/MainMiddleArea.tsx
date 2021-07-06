import ThreeWorld from '@components/ThreeWorld';
import { AnimationContext } from '@ctx/AnimationContext';
import styles from '@layouts_style/MainMiddleArea.module.sass';
import * as handpose from '@tensorflow-models/handpose';
import { fullCalculation } from '@util/handPose';
import React, { useContext, useEffect } from 'react';
import Webcam from 'react-webcam';

type TProps = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  webcamRef: React.MutableRefObject<Webcam | null>;
};

const MainMiddleArea = ({ canvasRef, webcamRef }: TProps): JSX.Element => {
  const {
    setIndexThumbAngle,
    setIsYRotationClock,
    setShouldRotate,
    setVideoHeight,
    setVideoWidth,
    setX,
    setY,
    setZoom,
  } = useContext(AnimationContext);
  const showWebCam = true;
  const { containerHeight, containerWidth } = useContext(AnimationContext);
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
        // drawZooming(ctx, hand);
        // drawFullHand(ctx, hand);
        // markCanvasCorners(ctx, videoWidth, videoHeight);
        const { indexDown, middleDown, pinkyDown, ringDown, thumbIn, xVal, yVal } = fullCalculation(hand);

        if (indexDown !== null && pinkyDown !== null && ringDown !== null && middleDown !== null && thumbIn !== null) {
          if (pinkyDown && ringDown && middleDown) {
            setZoom(3);
          } else {
            setZoom(1);
          }
          setShouldRotate(indexDown);
        }

        if (xVal !== null && yVal !== null) {
          setX(xVal);
          setY(yVal);
        }
      }
    }
  };

  useEffect(() => {
    runHandpose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showWebCam && (
        <Webcam
          ref={webcamRef}
          className={styles.videoObject}
          screenshotFormat='image/jpeg'
          mirrored
          width={containerWidth}
          height={containerHeight}
          videoConstraints={{ width: containerWidth, height: containerHeight }}
        />
      )}
      <canvas ref={canvasRef} className={styles.canvasObject} />
      <ThreeWorld />
    </>
  );
};

export default MainMiddleArea;
