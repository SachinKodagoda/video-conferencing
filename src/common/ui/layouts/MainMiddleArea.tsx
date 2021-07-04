import ThreeWorld from '@components/ThreeWorld';
import { AnimationContext } from '@ctx/AnimationContext';
import styles from '@layouts_style/MainMiddleArea.module.sass';
import React, { useContext } from 'react';
import Webcam from 'react-webcam';

type TProps = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  webcamRef: React.MutableRefObject<Webcam | null>;
};

const MainMiddleArea = ({ canvasRef, webcamRef }: TProps): JSX.Element => {
  const showWebCam = true;
  const { containerHeight, containerWidth } = useContext(AnimationContext);

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
