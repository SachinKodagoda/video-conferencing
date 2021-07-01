import { AnnotatedPrediction } from '@tensorflow-models/handpose';

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

export const drawHand = (predictions: AnnotatedPrediction[], ctx: CanvasRenderingContext2D): void => {
  if (predictions.length > 0) {
    // predictions.forEach((prediction: AnnotatedPrediction) => {
    //   const { landmarks } = prediction;
    //   for (let j = 0; j < Object.keys(fingerJoints).length; j += 1) {
    //     const finger = Object.keys(fingerJoints)[j];
    //     for (let k = 0; k < fingerJoints[finger].length - 1; k += 1) {
    //       const firstJointIndex = fingerJoints[finger][k];
    //       const secondJointIndex = fingerJoints[finger][k + 1];
    //       ctx.beginPath();
    //       ctx.moveTo(landmarks[firstJointIndex][0], landmarks[firstJointIndex][1]);
    //       ctx.lineTo(landmarks[secondJointIndex][0], landmarks[secondJointIndex][1]);
    //       ctx.strokeStyle = 'plum';
    //       ctx.lineWidth = 4;
    //       ctx.stroke();
    //     }
    //   }
    //   for (let i = 0; i < landmarks.length; i += 1) {
    //     const x = landmarks[i][0];
    //     const y = landmarks[i][1];
    //     ctx.beginPath();
    //     ctx.arc(x, y, style[i].size, 0, 3 * Math.PI);
    //     ctx.fillStyle = style[i].color;
    //     ctx.fill();
    //   }
    // });

    if (predictions.length > 0) {
      const predicted = predictions[0].landmarks;
      if (predicted.length > 0) {
        const xMidSum = predicted[0][0] + predicted[5][0] + predicted[17][0];
        const yMidSum = predicted[0][1] + predicted[5][1] + predicted[17][1];
        ctx.beginPath();
        ctx.arc(parseFloat((xMidSum / 3).toFixed(4)), parseFloat((yMidSum / 3).toFixed(4)), 10, 0, 3 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      }
    }
  }
};
