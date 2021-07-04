import World from '@components/World';
import styles from '@pages_style/index.module.sass';
import React from 'react';
import Webcam from 'react-webcam';

type TProps = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  webcamRef: React.MutableRefObject<Webcam | null>;
  containerWidth: number;
  containerHeight: number;
  videoSize: {
    width: number;
    height: number;
  };
  xy: {
    x: number;
    y: number;
  };
};
const scaler = 100;
const MainMiddleArea = ({
  canvasRef,
  containerHeight,
  containerWidth,
  videoSize,
  webcamRef,
  xy,
}: TProps): JSX.Element => {
  const showWebCam = false;
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
      <World width={videoSize.width} height={videoSize.height} scaler={scaler} x={xy.x} y={xy.y} />
    </>
  );
};

export default MainMiddleArea;
