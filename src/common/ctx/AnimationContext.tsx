import React, { useState } from 'react';

type TProps = {
  children: JSX.Element;
};

interface IContext {
  zoom: number;
  videoWidth: number;
  videoHeight: number;
  x: number;
  y: number;
  containerWidth: number;
  containerHeight: number;
  followHand: boolean;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  action: boolean;
  animate: boolean;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  setRotateX: React.Dispatch<React.SetStateAction<number>>;
  setRotateY: React.Dispatch<React.SetStateAction<number>>;
  setRotateZ: React.Dispatch<React.SetStateAction<number>>;
  setFollowHand: React.Dispatch<React.SetStateAction<boolean>>;
  // prevX: number;
  // prevY: number;
  // setPrevX: React.Dispatch<React.SetStateAction<number>>;
  // setPrevY: React.Dispatch<React.SetStateAction<number>>;
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setVideoWidth: React.Dispatch<React.SetStateAction<number>>;
  setVideoHeight: React.Dispatch<React.SetStateAction<number>>;
  setContainerHeight: React.Dispatch<React.SetStateAction<number>>;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
}

const initContext: IContext = {
  x: 0,
  y: 0,
  zoom: 1,
  videoWidth: 0,
  videoHeight: 0,
  containerWidth: 0,
  containerHeight: 0,
  followHand: false,
  setFollowHand: () => false,
  // prevX: 0,
  // prevY: 0,
  // setPrevX: () => {},
  // setPrevY: () => {},
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  action: false,
  animate: false,
  setAnimate: () => false,
  setAction: () => false,
  setRotateX: () => 0,
  setRotateY: () => 0,
  setRotateZ: () => 0,
  setZoom: () => null,
  setX: () => null,
  setY: () => null,
  setVideoWidth: () => null,
  setVideoHeight: () => null,
  setContainerHeight: () => null,
  setContainerWidth: () => null,
};

export const AnimationContext = React.createContext<IContext>(initContext);

export const AnimationContextProvider = ({ children }: TProps): React.ReactElement => {
  const [zoom, setZoom] = useState(initContext.zoom);
  const [videoWidth, setVideoWidth] = useState(initContext.videoWidth);
  const [videoHeight, setVideoHeight] = useState(initContext.videoHeight);
  const [containerHeight, setContainerHeight] = useState(initContext.containerHeight);
  const [containerWidth, setContainerWidth] = useState(initContext.containerWidth);
  const [x, setX] = useState(initContext.x);
  const [y, setY] = useState(initContext.y);
  const [followHand, setFollowHand] = useState(initContext.followHand);
  const [rotateX, setRotateX] = useState(initContext.rotateX);
  const [rotateY, setRotateY] = useState(initContext.rotateY);
  const [rotateZ, setRotateZ] = useState(initContext.rotateZ);
  const [action, setAction] = useState(initContext.action);
  const [animate, setAnimate] = useState(initContext.animate);
  // const [prevX, setPrevX] = useState(initContext.prevX);
  // const [prevY, setPrevY] = useState(initContext.prevY);
  const contextValue = {
    zoom,
    videoWidth,
    videoHeight,
    containerWidth,
    containerHeight,
    x,
    y,
    followHand,
    rotateX,
    rotateY,
    rotateZ,
    action,
    animate,
    setAnimate,
    setAction,
    setRotateX,
    setRotateY,
    setRotateZ,
    setFollowHand,
    setZoom,
    setVideoWidth,
    setVideoHeight,
    setX,
    setY,
    setContainerHeight,
    setContainerWidth,
    // prevX,
    // prevY,
    // setPrevX,
    // setPrevY,
  };

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>;
};
