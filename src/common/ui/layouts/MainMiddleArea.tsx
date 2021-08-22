import ThreeWorld from '@components/ThreeWorld';
import { AnimationContext } from '@ctx/AnimationContext';
import styles from '@layouts_style/MainMiddleArea.module.sass';
import * as cam from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils/';
import HandLib, { Hands, InputImage } from '@mediapipe/hands';
// import * as handpose from '@tensorflow-models/handpose';
// import { drawFullHand, drawZooming, fullCalculation } from '@util/handPose';
import React, { useContext, useEffect } from 'react';
import Webcam from 'react-webcam';

type TProps = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  webcamRef: React.MutableRefObject<Webcam | null>;
};

let camera = null;
let r = 1;
const w = 1;
let s1 = 1;
const s2 = 1;
let longChange = [];
let shortChange = [];
let originalL = 1;

type TPoints = {
  x: number;
  y: number;
  z: number;
};

type TFingerPoint = {
  x: number;
  y: number;
};

const find_angle = (A: TPoints, B: TPoints, C: TPoints) => {
  const AB = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2);
  const BC = Math.sqrt((B.x - C.x) ** 2 + (B.y - C.y) ** 2);
  const AC = Math.sqrt((C.x - A.x) ** 2 + (C.y - A.y) ** 2);
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
};

const MainMiddleArea = ({ canvasRef, webcamRef }: TProps): JSX.Element => {
  const { setVideoHeight, setVideoWidth, setScale, setX, setY, x, y } = useContext(AnimationContext);
  const showWebCam = true;
  const { containerHeight, containerWidth } = useContext(AnimationContext);
  const runMediaPipe = async () => {
    if (webcamRef && canvasRef && webcamRef.current && canvasRef.current && webcamRef.current.video) {
      const hands = new Hands({
        locateFile: file => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 2,
        minDetectionConfidence: 0.8,
        minTrackingConfidence: 0.8,
      });

      hands.onResults(results => {
        const videoReference = webcamRef?.current?.video as HTMLVideoElement;
        const canvasReference = canvasRef?.current as HTMLCanvasElement;
        const { videoWidth } = videoReference;
        const { videoHeight } = videoReference;
        videoReference.width = videoWidth;
        videoReference.height = videoHeight;
        canvasReference.width = videoWidth;
        canvasReference.height = videoHeight;
        setVideoWidth(videoWidth);
        setVideoHeight(videoHeight);
        const canvasCtx = canvasRef.current?.getContext('2d');
        canvasCtx?.save();
        canvasCtx?.clearRect(0, 0, videoWidth, videoHeight);
        canvasCtx?.drawImage(results.image, 0, 0, videoWidth, videoHeight);

        if (results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            const longG = [landmarks[8], landmarks[5], landmarks[4]];
            const shortG = [landmarks[8], landmarks[4]];
            const angle = find_angle(longG[0], longG[1], longG[2]) / Math.PI;
            const distance = Math.sqrt(
              (shortG[0].x - shortG[1].x) ** 2 + (shortG[0].y - shortG[1].y) ** 2 + (shortG[0].z - shortG[1].z) ** 2
            );
            if (angle > 0.7) {
              if (canvasCtx) {
                drawConnectors(canvasCtx, longG, HandLib.HAND_CONNECTIONS, {
                  color: '#FFFFFF',
                  lineWidth: 20,
                });
              }
            }
            if (distance < 0.1) {
              if (canvasCtx) {
                drawLandmarks(canvasCtx, shortG, {
                  color: '#FFFFFF',
                  lineWidth: 30,
                });
              }
            }
            rotation(distance, landmarks[5]);
            zoom(angle, landmarks[5]);
          }
          if (w !== r) {
            longChange.push(r);
          } else {
            longChange = [];
          }
          if (s2 !== s1) {
            shortChange.push(s1);
          } else {
            shortChange = [];
          }
        }
        if (canvasCtx) {
          canvasCtx.restore();
        }
      });

      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current?.video as unknown as InputImage });
        },
      });

      camera.start();
    }
  };

  useEffect(() => {
    runMediaPipe();
  }, [webcamRef, canvasRef]);

  // Function for the rotation -->
  const rotation = (distance: number, indexFingerMCP: TFingerPoint) => {
    if (distance < 0.1) {
      s1 += 1;
      if (shortChange.length === 0) {
        setX(indexFingerMCP.x);
        setY(indexFingerMCP.y);
      } else {
        setX(originalSX => (originalSX - indexFingerMCP.x) * 1);
        setY(originalSY => (originalSY - indexFingerMCP.y) * 1);
      }
    }
  };

  // Function for the zoom -->
  const zoom = (angle: number, indexFingerMCP: TFingerPoint) => {
    if (angle > 0.7) {
      r += 1;
      if (longChange.length === 0) {
        originalL = indexFingerMCP.x;
      } else {
        const positionZ = (originalL - indexFingerMCP.x) * 10;
        setScale(positionZ);
      }
    }
  };

  return (
    <div className={styles.fullCover}>
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
      <div className={styles.test}>
        {x}
        {y}
      </div>
    </div>
  );
};

export default MainMiddleArea;
