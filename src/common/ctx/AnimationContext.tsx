import { leftTopToCenter } from '@util/common';
import React, { useState } from 'react';

type TProps = {
  children: JSX.Element;
};

interface IContext {
  shouldRotate: boolean;
  scale: number;
  rotationValue: number;
  indexThumbAngle: number;
  videoWidth: number;
  videoHeight: number;
  x: number;
  y: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  setIndexThumbAngle: React.Dispatch<React.SetStateAction<number>>;
  setVideoWidth: React.Dispatch<React.SetStateAction<number>>;
  setVideoHeight: React.Dispatch<React.SetStateAction<number>>;
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  scaler: number;
  divider: number;
  xRatio: number;
  yRatio: number;
  right: number;
  top: number;
  left: number;
  bottom: number;
  handCenterX: number;
  handCenterY: number;
  containerWidth: number;
  containerHeight: number;
  isYRotationClock: boolean;
  width: number;
  height: number;
  setContainerHeight: React.Dispatch<React.SetStateAction<number>>;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  setShouldRotate: React.Dispatch<React.SetStateAction<boolean>>;
  setIsYRotationClock: React.Dispatch<React.SetStateAction<boolean>>;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
}

const initContext: IContext = {
  shouldRotate: false,
  scale: 1,
  rotationValue: 0,
  indexThumbAngle: 0,
  videoWidth: 0,
  videoHeight: 0,
  x: 0,
  y: 0,
  setScale: () => null,
  setIndexThumbAngle: () => null,
  setVideoWidth: () => null,
  setVideoHeight: () => null,
  setX: () => null,
  setY: () => null,
  scaler: 100,
  divider: 200,
  xRatio: 0,
  yRatio: 0,
  right: 0,
  top: 0,
  left: 0,
  bottom: 0,
  handCenterX: 0,
  handCenterY: 0,
  containerWidth: 0,
  containerHeight: 0,
  isYRotationClock: false,
  width: 0,
  height: 0,
  setContainerHeight: () => null,
  setContainerWidth: () => null,
  setShouldRotate: () => null,
  setIsYRotationClock: () => null,
  setWidth: () => null,
  setHeight: () => null,
};

export const AnimationContext = React.createContext<IContext>(initContext);

export const AnimationContextProvider = ({ children }: TProps): React.ReactElement => {
  const [scale, setScale] = useState(initContext.scale);
  const [shouldRotate, setShouldRotate] = useState(initContext.shouldRotate);
  const [isYRotationClock, setIsYRotationClock] = useState(initContext.isYRotationClock);
  const [indexThumbAngle, setIndexThumbAngle] = useState(initContext.indexThumbAngle);
  const [videoWidth, setVideoWidth] = useState(initContext.videoWidth);
  const [videoHeight, setVideoHeight] = useState(initContext.videoHeight);
  const [containerHeight, setContainerHeight] = useState(initContext.containerHeight);
  const [containerWidth, setContainerWidth] = useState(initContext.containerWidth);
  const [x, setX] = useState(initContext.x);
  const [y, setY] = useState(initContext.y);
  const [width, setWidth] = useState(initContext.width);
  const [height, setHeight] = useState(initContext.height);
  const scaler = 100;
  const divider = scaler * 2;
  const xRatio = width / divider;
  const yRatio = height / divider;
  const right = xRatio;
  const top = yRatio;
  const left = -xRatio;
  const bottom = -yRatio;
  const handCenterX = leftTopToCenter(x, width, scaler, 0);
  const handCenterY = leftTopToCenter(y, height, scaler, 0);
  // degree_angle * 360 / 100 => (radian_angle * 180 * 360) / (100 * PI)
  // const rotationValue = (2 * Math.PI * indexThumbAngle) / 2;
  const rotationValue = indexThumbAngle;

  const contextValue = {
    scale,
    rotationValue,
    indexThumbAngle,
    videoWidth,
    videoHeight,
    containerWidth,
    containerHeight,
    x,
    y,
    scaler,
    divider,
    xRatio,
    yRatio,
    right,
    top,
    left,
    bottom,
    handCenterX,
    handCenterY,
    shouldRotate,
    isYRotationClock,
    width,
    height,
    setScale,
    setIndexThumbAngle,
    setVideoWidth,
    setVideoHeight,
    setX,
    setY,
    setContainerHeight,
    setContainerWidth,
    setShouldRotate,
    setIsYRotationClock,
    setWidth,
    setHeight,
  };

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>;
};
