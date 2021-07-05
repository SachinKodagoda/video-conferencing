import { useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import React, { useRef } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type TProps = {
  position: Vector3;
  zoomVal: number;
};
type TGLTFResult = GLTF & {
  nodes: {
    Armature_rootJoint: THREE.Mesh;
    RedGeo_0: THREE.SkinnedMesh;
  };
  materials: {
    RedMat: THREE.MeshStandardMaterial;
  };
};
const ThreeModel = ({ position, zoomVal }: TProps): JSX.Element => {
  const group = useRef();
  const { materials, nodes } = useGLTF('3d/angryBird/scene.gltf') as TGLTFResult;
  return (
    <group ref={group} dispose={null} position={position} scale={zoomVal > 1.8 ? 2 : 1}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={1.47}>
          <primitive object={nodes.Armature_rootJoint} />
          <skinnedMesh
            geometry={nodes.RedGeo_0.geometry}
            material={materials.RedMat}
            skeleton={nodes.RedGeo_0.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/scene_draco.glb');

export default ThreeModel;
