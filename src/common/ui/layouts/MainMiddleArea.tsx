import ThreeWorld from '@components/ThreeWorld';
import { AnimationContext } from '@ctx/AnimationContext';
import styles from '@layouts_style/MainMiddleArea.module.sass';
import * as handpose from '@tensorflow-models/handpose';
import { drawFullHand, getHandCenter } from '@util/handPose';
import React, { useContext, useEffect } from 'react';
import Webcam from 'react-webcam';

type TProps = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  webcamRef: React.MutableRefObject<Webcam | null>;
};

const MainMiddleArea = ({ canvasRef, webcamRef }: TProps): JSX.Element => {
  const { setVideoHeight, setVideoWidth, setX, setY, setZoom, setZoomAngle } = useContext(AnimationContext);
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
