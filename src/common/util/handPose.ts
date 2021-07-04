import { AnnotatedPrediction } from '@tensorflow-models/handpose';

type TReturn = {
  xVal: number | null;
  yVal: number | null;
};

type TFingerJoints = {
  thumb: number[];
  indexFinger: number[];
  middleFinger: number[];
  ringFinger: number[];
  pinky: number[];
};

// Points for finger
const fingerJoints: TFingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
  0: { color: 'yellow', size: 15 },
  1: { color: 'gold', size: 6 },
  2: { color: 'green', size: 10 }, // green
  3: { color: 'gold', size: 6 },
  4: { color: 'gold', size: 6 },
  5: { color: 'purple', size: 10 }, // purple
  6: { color: 'gold', size: 6 },
  7: { color: 'gold', size: 6 },
  8: { color: 'gold', size: 6 },
  9: { color: 'blue', size: 10 }, // blue
  10: { color: 'gold', size: 6 },
  11: { color: 'gold', size: 6 },
  12: { color: 'gold', size: 6 },
  13: { color: 'red', size: 10 }, // red
  14: { color: 'gold', size: 6 },
  15: { color: 'gold', size: 6 },
  16: { color: 'gold', size: 6 },
  17: { color: 'orange', size: 10 }, // orange
  18: { color: 'gold', size: 6 },
  19: { color: 'gold', size: 6 },
  20: { color: 'gold', size: 6 },
};

// Draw the center of the hand -->
export const drawHandCenter = (ctx: CanvasRenderingContext2D, hand: AnnotatedPrediction[]): TReturn => {
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
      return {
        xVal,
        yVal,
      };
    }
  }
  return {
    xVal: null,
    yVal: null,
  };
};

// Draw the full hand -->
export const drawFullHand = (ctx: CanvasRenderingContext2D, hand: AnnotatedPrediction[]): void => {
  if (hand.length > 0) {
    hand.forEach((prediction: AnnotatedPrediction) => {
      const { landmarks } = prediction;
      for (let j = 0; j < Object.keys(fingerJoints).length; j += 1) {
        const finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k += 1) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];
          ctx.beginPath();
          ctx.moveTo(landmarks[firstJointIndex][0], landmarks[firstJointIndex][1]);
          ctx.lineTo(landmarks[secondJointIndex][0], landmarks[secondJointIndex][1]);
          ctx.strokeStyle = 'plum';
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }
      for (let i = 0; i < landmarks.length; i += 1) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];
        ctx.beginPath();
        ctx.arc(x, y, style[i].size, 0, 3 * Math.PI);
        ctx.fillStyle = style[i].color;
        ctx.fill();
      }
    });
  }
};

// Draw the corners of the canvas -->
export const markCanvasCorners = (ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number): void => {
  const xMiddle = screenWidth / 2;
  const yMiddle = screenHeight / 2;
  const right = 0;
  const left = screenWidth;
  const top = 0;
  const bottom = screenHeight;
  for (let j = 0; j < 10; j += 1) {
    ctx.beginPath();
    if (j === 0) {
      // origin (right top)
      ctx.arc(right, top, 10, 0, 5 * Math.PI);
      ctx.fillStyle = 'white';
    } else if (j === 1) {
      // center (xMiddle, yMiddle)
      ctx.arc(xMiddle, yMiddle, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    } else if (j === 2) {
      // left top
      ctx.arc(left, top, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    } else if (j === 3) {
      // xMiddle top
      ctx.arc(xMiddle, top, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    } else if (j === 4) {
      // right top
      ctx.arc(right, top, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    } else if (j === 5) {
      // right yMiddle
      ctx.arc(right, yMiddle, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    } else if (j === 6) {
      // right bottom
      ctx.arc(right, bottom, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    } else if (j === 7) {
      // xMiddle bottom
      ctx.arc(xMiddle, bottom, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    } else if (j === 8) {
      // left bottom
      ctx.arc(left, bottom, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    } else {
      // left yMiddle
      ctx.arc(left, yMiddle, 10, 0, 3 * Math.PI);
      ctx.fillStyle = 'red';
    }
    ctx.fill();
  }
};
