import { Vector3 } from '@react-three/fiber';
import React, { useRef, useState } from 'react';

type TProps = {
  position: Vector3;
  zoomVal: number;
};
const ThreeBox = ({ position, zoomVal }: TProps): JSX.Element => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // useFrame(() => {
  //   if (mesh?.current?.rotation?.x) {
  //     mesh.current.rotation.x += 0.01;
  //   }
  // });

  return (
    <mesh
      position={position}
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
