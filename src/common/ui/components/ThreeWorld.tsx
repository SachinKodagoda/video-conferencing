import ThreeBox from '@components/ThreeBox';
import ThreeModel from '@components/ThreeModel';
import styles from '@components_style/ThreeWorld.module.sass';
import { AnimationContext } from '@ctx/AnimationContext';
import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useContext } from 'react';

// examples
// https://onion2k.github.io/r3f-by-example/

const ThreeWorld = (): JSX.Element => {
  const { bottom, divider, handCenterX, handCenterY, left, right, top, videoHeight, videoWidth, zoomAngle, zoomVal } =
    useContext(AnimationContext);
  // eslint-disable-next-line no-console
  console.log('zoomAngle: =-->', zoomAngle);
  // eslint-disable-next-line no-console
  console.log('handCenterX: =-->', handCenterX);
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
      <ThreeBox position={[handCenterX, handCenterY, 0]} zoomVal={zoomVal} />
      <Suspense fallback={null}>
        <ThreeModel />
      </Suspense>
    </Canvas>
  );
};

export default ThreeWorld;
