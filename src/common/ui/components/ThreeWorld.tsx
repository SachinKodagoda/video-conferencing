import ThreeTestModel from '@components/ThreeTestModel';
import styles from '@components_style/ThreeWorld.module.sass';
import { AnimationContext } from '@ctx/AnimationContext';
import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { leftTopToCenter } from '@util/common';
import React, { Suspense, useContext } from 'react';

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
    zoom,
  } = useContext(AnimationContext);

  return (
    <Canvas className={styles.newCanvas} style={{ width: videoWidth, height: videoHeight }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrthographicCamera
        makeDefault
        zoom={1}
        top={top}
        bottom={bottom}
        left={left}
        right={right}
        near={0}
        far={divider}
        position={[0, 0, divider]}
      />
      <Suspense fallback={null}>
        <ThreeTestModel
          position={[leftTopToCenter(x, videoWidth, scaler, 0), leftTopToCenter(y, videoHeight, scaler, 150), 0]}
          zoom={zoom}
          shouldRotate={shouldRotate}
          isYRotationClock={isYRotationClock}
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeWorld;
