import Heart from '@components/Heart';
import styles from '@components_style/ThreeWorld.module.sass';
import { AnimationContext } from '@ctx/AnimationContext';
import { DepthBuffer, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { leftTopToCenter } from '@util/common';
import React, { Suspense, useContext, useEffect, useRef, useState } from 'react';

// examples
// https://onion2k.github.io/r3f-by-example/
// https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md

const ThreeWorld = (): JSX.Element => {
  const {
    bottom,
    divider,
    isYRotationClock,
    left,
    right,
    scaler,
    shouldRotate,
    top,
    videoHeight,
    videoWidth,
    x,
    y,
    scale,
    setWidth,
    setHeight,
    width,
    height,
  } = useContext(AnimationContext);
  const threeDCanvas = useRef(null);

  useEffect(() => {
    if (threeDCanvas.current) {
      const temp = threeDCanvas.current as unknown as HTMLDivElement;
      setWidth(temp.clientWidth);
      setHeight(temp.clientHeight);
    }
  }, [threeDCanvas]);

  // eslint-disable-next-line no-console
  console.log('[leftTopToCenter(x, width, scaler, 0), leftTopToCenter(y, height, scaler, 150), 0]: =-->', [
    leftTopToCenter(0, width, scaler, 0),
    leftTopToCenter(0, height, scaler, 150),
    0,
  ]);
  const lightTargetYDelta = 120;
  const lightTargetXDelta = 80;
  const [lightPosition, setLightPosition] = useState([-lightTargetXDelta, -lightTargetYDelta, 200]);
  const [depthBuffer, setDepthBuffer] = useState();
  return (
    <Canvas className={styles.newCanvas} ref={threeDCanvas}>
      <ambientLight intensity={0.9} />
      <pointLight position={[0, 0, 500]} intensity={1} />
      <pointLight position={[500, 0, 0]} intensity={1} />
      <pointLight position={[0, 500, 0]} intensity={1} />
      <PerspectiveCamera makeDefault position={[0, 0, 200]} rotation={[0, 0, 0]} />
      <OrbitControls />
      <DepthBuffer ref={setDepthBuffer} size={1000} />
      {/* <Suspense fallback={null}>
        <ThreeTestModel
          position={[leftTopToCenter(width / 2, width, scaler, 0), leftTopToCenter(height / 2, height, scaler, 0), 0]}
          scale={scale}
          shouldRotate={shouldRotate}
          isYRotationClock={isYRotationClock}
        />
      </Suspense> */}

      {/* <Suspense fallback={null}>
        <Kick
          position={[leftTopToCenter(width / 2, width, scaler, 0), leftTopToCenter(height / 2, height, scaler, 0), 0]}
          scale={scale}
        />
      </Suspense> */}
      <Suspense fallback={null}>
        <Heart
          position={[leftTopToCenter(width / 2, width, scaler, 0), leftTopToCenter(height / 2, height, scaler, 0), 0]}
          scale={1}
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeWorld;
