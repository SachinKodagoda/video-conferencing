import Heart from '@components/Heart';
import styles from '@components_style/ThreeWorld.module.sass';
import { AnimationContext } from '@ctx/AnimationContext';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import { leftTopToCenter } from '@util/common';
import React, { Suspense, useContext, useRef } from 'react';

const ThreeWorld = (): JSX.Element => {
  const {
    containerWidth,
    containerHeight,
    videoWidth,
    videoHeight,
    zoom,
    x,
    y,
    followHand,
    rotateX,
    rotateY,
    rotateZ,
  } = useContext(AnimationContext);
  const threeDCanvas = useRef(null);
  const position: Vector3 = followHand
    ? [leftTopToCenter(x, videoWidth, 0.5, 0), leftTopToCenter(y, videoHeight, 0.5, 0), 0]
    : [0, 0, 0];
  return (
    <Canvas className={styles.threeDCanvas} ref={threeDCanvas}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, -500, 0]} intensity={0.8} />
      <pointLight position={[0, 500, 0]} intensity={0.8} />
      <pointLight position={[0, 0, -500]} intensity={0.8} />
      <pointLight position={[0, 0, 500]} intensity={0.8} />
      <pointLight position={[500, 0, 0]} intensity={0.8} />
      <pointLight position={[-500, 0, 0]} intensity={0.8} />
      <pointLight position={[-500, -500, -500]} intensity={0.8} />
      <pointLight position={[500, 500, 500]} intensity={0.5} />
      <PerspectiveCamera makeDefault position={[0, 0, 200]} rotation={[0, 0, 0]} />
      {/* <OrbitControls /> */}
      <Suspense fallback={null}>
        <Heart position={position} scale={zoom} rotation={[rotateX, rotateY, rotateZ]} />
      </Suspense>
    </Canvas>
  );
};

export default ThreeWorld;
