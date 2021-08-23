import React, { useState } from 'react';

type TProps = {
  children: JSX.Element;
};

interface IContext {
  videoWidth: number;
  videoHeight: number;
  containerWidth: number;
  containerHeight: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  zoom: number;
  x: number;
  y: number;
  handX: number;
  handY: number;
  action: boolean;
  animate: boolean;
  followHand: boolean;
  setVideoWidth: React.Dispatch<React.SetStateAction<number>>;
  setVideoHeight: React.Dispatch<React.SetStateAction<number>>;
  setContainerHeight: React.Dispatch<React.SetStateAction<number>>;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  setRotateX: React.Dispatch<React.SetStateAction<number>>;
  setRotateY: React.Dispatch<React.SetStateAction<number>>;
  setRotateZ: React.Dispatch<React.SetStateAction<number>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  setHandX: React.Dispatch<React.SetStateAction<number>>;
  setHandY: React.Dispatch<React.SetStateAction<number>>;
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
  setFollowHand: React.Dispatch<React.SetStateAction<boolean>>;
}

const initContext: IContext = {
  videoWidth: 0,
  videoHeight: 0,
  containerWidth: 0,
  containerHeight: 0,
  rotateX: (-Math.PI * 4) / 2,
  rotateY: -Math.PI / 2,
  rotateZ: 0,
  zoom: 1,
  x: 0,
  y: 0,
  handX: 0,
  handY: 0,
  action: false,
  animate: false,
  followHand: true,
  setVideoWidth: () => null,
  setVideoHeight: () => null,
  setContainerHeight: () => null,
  setContainerWidth: () => null,
  setRotateX: () => 0,
  setRotateY: () => 0,
  setRotateZ: () => 0,
  setZoom: () => null,
  setX: () => null,
  setY: () => null,
  setHandX: () => 0,
  setHandY: () => 0,
  setAction: () => false,
  setAnimate: () => false,
  setFollowHand: () => false,
};

export const AnimationContext = React.createContext<IContext>(initContext);

export const AnimationContextProvider = ({ children }: TProps): React.ReactElement => {
  const [videoWidth, setVideoWidth] = useState(initContext.videoWidth);
  const [videoHeight, setVideoHeight] = useState(initContext.videoHeight);
  const [containerHeight, setContainerHeight] = useState(initContext.containerHeight);
  const [containerWidth, setContainerWidth] = useState(initContext.containerWidth);
  const [rotateX, setRotateX] = useState(initContext.rotateX);
  const [rotateY, setRotateY] = useState(initContext.rotateY);
  const [rotateZ, setRotateZ] = useState(initContext.rotateZ);
  const [zoom, setZoom] = useState(initContext.zoom);
  const [x, setX] = useState(initContext.x);
  const [y, setY] = useState(initContext.y);
  const [handX, setHandX] = useState(initContext.handX);
  const [handY, setHandY] = useState(initContext.handY);
  const [action, setAction] = useState(initContext.action);
  const [animate, setAnimate] = useState(initContext.animate);
  const [followHand, setFollowHand] = useState(initContext.followHand);
  const contextValue = {
    videoWidth,
    videoHeight,
    containerWidth,
    containerHeight,
    rotateX,
    rotateY,
    rotateZ,
    zoom,
    x,
    y,
    handX,
    handY,
    action,
    animate,
    followHand,
    setVideoWidth,
    setVideoHeight,
    setContainerHeight,
    setContainerWidth,
    setRotateX,
    setRotateY,
    setRotateZ,
    setZoom,
    setX,
    setY,
    setHandX,
    setHandY,
    setAction,
    setAnimate,
    setFollowHand,
  };

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>;
};
