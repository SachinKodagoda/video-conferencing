import { useAnimations, useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type TProps = {
  position: Vector3;
  scale: number;
  animate: boolean;
  rotateZ: number;
  rotateX: number;
  rotateY: number;
};
type TGLTFResult = GLTF & {
  nodes: {
    Ch03: THREE.SkinnedMesh;
  };
  materials: {
    Ch03_Body: THREE.MeshStandardMaterial;
  };
  actions: {
    Armada: THREE.AnimationAction;
  };
};
const Heart = ({ rotateZ, rotateX, rotateY, scale }: TProps): JSX.Element => {
  const group = useRef<THREE.Mesh>(null!);
  const { nodes, animations } = useGLTF('3d/Heart/scene.gltf') as TGLTFResult;
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions['Take 001']?.play();
  });
  return (
    <group ref={group} dispose={null} scale={scale}>
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          name='0'
          geometry={nodes['0'].geometry}
          material={nodes['0'].material}
          morphTargetDictionary={nodes['0'].morphTargetDictionary}
          morphTargetInfluences={nodes['0'].morphTargetInfluences}
        />
      </group>
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          name='1'
          geometry={nodes['1'].geometry}
          material={nodes['1'].material}
          morphTargetDictionary={nodes['1'].morphTargetDictionary}
          morphTargetInfluences={nodes['1'].morphTargetInfluences}
        />
      </group>
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          geometry={nodes['heart_03_Material_#57_0'].geometry}
          material={nodes['heart_03_Material_#57_0'].material}
        />
      </group>
    </group>
  );
};

export default Heart;
