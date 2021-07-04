import { AnimationContext } from '@ctx/AnimationContext';
import { leftTopToCenter } from '@util/common';
import React, { useContext, useRef, useState } from 'react';

const ThreeBox = (): JSX.Element => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { handCenterX, handCenterY, scaler, videoHeight, videoWidth, x, y, zoomVal } = useContext(AnimationContext);
  // useFrame(() => {
  //   if (mesh?.current?.rotation?.x) {
  //     mesh.current.rotation.x += 0.01;
  //   }
  // });

  // eslint-disable-next-line no-console
  console.log('handCenterX: =-->', handCenterX);
  return (
    <mesh
      position={[leftTopToCenter(x, videoWidth, scaler), leftTopToCenter(y, videoHeight, scaler), 0]}
      ref={mesh}
      scale={zoomVal > 1.8 ? 2 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default ThreeBox;
