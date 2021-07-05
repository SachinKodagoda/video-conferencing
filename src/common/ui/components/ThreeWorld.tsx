import ThreeTestModel from '@components/ThreeTestModel';
import styles from '@components_style/ThreeWorld.module.sass';
import { AnimationContext } from '@ctx/AnimationContext';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useContext } from 'react';

// examples
// https://onion2k.github.io/r3f-by-example/
// https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md

const ThreeWorld = (): JSX.Element => {
  const { bottom, divider, handCenterX, handCenterY, left, right, top, videoHeight, videoWidth, zoomVal } =
    useContext(AnimationContext);
  return (
    <Canvas className={styles.newCanvas} style={{ width: videoWidth, height: videoHeight }}>
      <OrbitControls />
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
        <ThreeTestModel position={[handCenterX, handCenterY, 0]} zoomVal={zoomVal} />
      </Suspense>
    </Canvas>
  );
};

export default ThreeWorld;
