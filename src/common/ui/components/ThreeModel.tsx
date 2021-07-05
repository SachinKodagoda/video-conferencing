/* eslint-disable react/jsx-props-no-spreading */
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type TGLTFResult = GLTF & {
  nodes: {
    Cube_003_0: THREE.Mesh;
    Cube_003_1: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
    inner: THREE.MeshStandardMaterial;
  };
};
const ThreeModel = (): JSX.Element => {
  const { materials, nodes } = useGLTF('./public/3d/duck/RubberDuck.gltf') as TGLTFResult;
  return (
    <group dispose={null}>
      <group name='Camera' position={[10, 0, 50]} rotation={[Math.PI / 2, 0, 0]}>
        <PerspectiveCamera fov={40} near={10} far={1000} />
      </group>
      <group name='Sun' position={[100, 50, 100]} rotation={[-Math.PI / 2, 0, 0]}>
        <pointLight intensity={10} />
      </group>
      <mesh geometry={nodes.Cube_003_0.geometry} material={materials.base} />
      <mesh geometry={nodes.Cube_003_1.geometry} material={materials.inner} />
    </group>
  );
};

useGLTF.preload('/model.gltf');

export default ThreeModel;
