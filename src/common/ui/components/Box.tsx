import { Vector3 } from '@react-three/fiber';
import React, { useRef, useState } from 'react';

type TProps = {
  position: Vector3 | undefined;
};
const Box = ({ position }: TProps): JSX.Element => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  //   useFrame(() => {
  //     if (mesh?.current?.rotation?.x) {
  //       mesh.current.rotation.x += 0.01;
  //     }
  //   });
  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 2, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Box;
