import Box from '@components/Box';
import styles from '@components_style/World.module.sass';
import { Canvas } from '@react-three/fiber';
import { leftTopToCenter } from '@util/common';
import React from 'react';

type TProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  scaler: number;
};

const World = ({ height, scaler, width, x, y }: TProps): JSX.Element => {
  const showMovingBox = false;
  return (
    <Canvas className={styles.newCanvas} orthographic camera={{ far: 1, near: 0.1, right: 10 }}>
      {/* <OrbitControls enableZoom={false} /> */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {showMovingBox ? (
        <Box position={[leftTopToCenter(x, width, scaler), leftTopToCenter(y, height, scaler), 0]} />
      ) : (
        <Box position={[0, 0, 0]} />
      )}
    </Canvas>
  );
};

export default World;
