import { leftTopToCenter } from '@util/common';
import React, { useState } from 'react';

type TProps = {
  children: JSX.Element;
};

interface IContext {
  zoom: boolean;
  zoomVal: number;
  zoomAngle: number;
  videoWidth: number;
  videoHeight: number;
  x: number;
  y: number;
  setZoom: React.Dispatch<React.SetStateAction<boolean>>;
  setZoomAngle: React.Dispatch<React.SetStateAction<number>>;
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
  setContainerHeight: React.Dispatch<React.SetStateAction<number>>;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
}

const initContext: IContext = {
  zoom: false,
  zoomVal: 0,
  zoomAngle: 0,
  videoWidth: 0,
  videoHeight: 0,
  x: 0,
  y: 0,
  setZoom: () => null,
  setZoomAngle: () => null,
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
  setContainerHeight: () => null,
  setContainerWidth: () => null,
};

export const AnimationContext = React.createContext<IContext>(initContext);

export const AnimationContextProvider = ({ children }: TProps): React.ReactElement => {
  const [zoom, setZoom] = useState(initContext.zoom);
  const [zoomAngle, setZoomAngle] = useState(initContext.zoomAngle);
  const [videoWidth, setVideoWidth] = useState(initContext.videoWidth);
  const [videoHeight, setVideoHeight] = useState(initContext.videoHeight);
  const [containerHeight, setContainerHeight] = useState(initContext.containerHeight);
  const [containerWidth, setContainerWidth] = useState(initContext.containerWidth);
  const [x, setX] = useState(initContext.x);
  const [y, setY] = useState(initContext.y);
  const scaler = 100;
  const divider = scaler * 2;
  const xRatio = videoWidth / divider;
  const yRatio = videoHeight / divider;
  const right = xRatio;
  const top = yRatio;
  const left = -xRatio;
  const bottom = -yRatio;
  const handCenterX = leftTopToCenter(x, videoWidth, scaler);
  const handCenterY = leftTopToCenter(y, videoHeight, scaler);
  // degree_angle * 2 / 100 => (radian_angle * 180 * 2) / (100 * PI)
  const zoomVal = (zoomAngle * 3.6) / Math.PI;

  const contextValue = {
    zoom,
    zoomVal,
    zoomAngle,
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
    setZoom,
    setZoomAngle,
    setVideoWidth,
    setVideoHeight,
    setX,
    setY,
    setContainerHeight,
    setContainerWidth,
  };

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>;
};
