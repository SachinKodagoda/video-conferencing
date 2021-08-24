import { Billboard, Text, useAnimations, useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import { TTextObj } from '@ts/common';
import React, { useEffect, useRef } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type TProps = {
  position: Vector3;
  scale: number;
  animate: boolean;
  rotateZ: number;
  rotateX: number;
  rotateY: number;
  textObj: TTextObj;
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
const Heart = ({ rotateZ, rotateX, rotateY, scale, position, textObj }: TProps): JSX.Element => {
  const group = useRef<THREE.Mesh>(null!);
  const { nodes, animations } = useGLTF('3d/Heart/heart.glb') as TGLTFResult;
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions['Take 001']?.play();
  });
  return (
    <group ref={group} dispose={null} scale={scale} position={position} rotation={[rotateX, rotateY, rotateZ]}>
      {/* Main Big body ---> */}
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          name='0'
          geometry={nodes['0'].geometry}
          material={nodes['0'].material}
          morphTargetDictionary={nodes['0'].morphTargetDictionary}
          morphTargetInfluences={nodes['0'].morphTargetInfluences}
        />
        <Billboard follow={true} position={[125, 0, 0]} lockX={true} lockY={true} lockZ={true} rotation={[0, -300, 0]}>
          <Text
            fontSize={20}
            outlineWidth={'5%'}
            outlineColor='#000000'
            outlineOpacity={1}
            anchorX='center'
            anchorY='middle'>
            {` test`}
          </Text>
        </Billboard>
        <Billboard
          follow={true}
          position={[60, 100, -80]}
          lockX={true}
          lockY={true}
          lockZ={true}
          rotation={[0, -300, 0]}>
          <Text
            fontSize={20}
            outlineWidth={'5%'}
            outlineColor='#000000'
            outlineOpacity={1}
            anchorX='center'
            anchorY='middle'>
            {` test`}
          </Text>
        </Billboard>
        {textObj['right_coronary_artery'].display && (
          <Billboard
            follow={true}
            position={textObj['right_coronary_artery'].position}
            lockX={true}
            lockY={true}
            lockZ={true}
            rotation={textObj['right_coronary_artery'].rotation}>
            <Text
              fontSize={20}
              outlineWidth={'5%'}
              outlineColor='#000000'
              outlineOpacity={2}
              anchorX={textObj['right_coronary_artery'].align}
              anchorY='middle'>
              {`${
                textObj['right_coronary_artery'].number
                  ? textObj['right_coronary_artery'].numberVal
                  : textObj['right_coronary_artery'].text
              }`}
            </Text>
          </Billboard>
        )}
      </group>
      {/* Middle Part ---> */}
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          name='1'
          geometry={nodes['1'].geometry}
          material={nodes['1'].material}
          morphTargetDictionary={nodes['1'].morphTargetDictionary}
          morphTargetInfluences={nodes['1'].morphTargetInfluences}
        />
        {textObj['left_atrium'].display && (
          <Billboard
            follow={true}
            position={textObj['left_atrium'].position}
            lockX={true}
            lockY={true}
            lockZ={true}
            rotation={textObj['left_atrium'].rotation}>
            <Text
              fontSize={20}
              outlineWidth={'5%'}
              outlineColor='#000000'
              outlineOpacity={0}
              anchorX={textObj['left_atrium'].align}
              anchorY='middle'>
              {`${textObj['left_atrium'].number ? textObj['left_atrium'].numberVal : textObj['left_atrium'].text}`}
            </Text>
          </Billboard>
        )}
        {textObj['left_pulmonary_artery1'].display && (
          <Billboard
            follow={true}
            position={textObj['left_pulmonary_artery1'].position}
            lockX={true}
            lockY={true}
            lockZ={true}
            rotation={textObj['left_pulmonary_artery1'].rotation}>
            <Text
              fontSize={20}
              outlineWidth={'5%'}
              outlineColor='#000000'
              outlineOpacity={1}
              anchorX={textObj['left_pulmonary_artery1'].align}
              anchorY='middle'>
              {`${
                textObj['left_pulmonary_artery1'].number
                  ? textObj['left_pulmonary_artery1'].numberVal
                  : textObj['left_pulmonary_artery1'].text
              }`}
            </Text>
          </Billboard>
        )}
        {textObj['left_pulmonary_artery2'].display && (
          <Billboard
            follow={true}
            position={textObj['left_pulmonary_artery2'].position}
            lockX={true}
            lockY={true}
            lockZ={true}
            rotation={textObj['left_pulmonary_artery2'].rotation}>
            <Text
              fontSize={20}
              outlineWidth={'5%'}
              outlineColor='#000000'
              outlineOpacity={2}
              anchorX={textObj['left_pulmonary_artery2'].align}
              anchorY='middle'>
              {`${
                textObj['left_pulmonary_artery2'].number
                  ? textObj['left_pulmonary_artery2'].numberVal
                  : textObj['left_pulmonary_artery2'].text
              }`}
            </Text>
          </Billboard>
        )}
        {textObj['inferior_vena_cava'].display && (
          <Billboard
            follow={true}
            position={textObj['inferior_vena_cava'].position}
            lockX={true}
            lockY={true}
            lockZ={true}
            rotation={textObj['inferior_vena_cava'].rotation}>
            <Text
              fontSize={20}
              outlineWidth={'5%'}
              outlineColor='#000000'
              outlineOpacity={2}
              anchorX={textObj['inferior_vena_cava'].align}
              anchorY='middle'>
              {`${
                textObj['inferior_vena_cava'].number
                  ? textObj['inferior_vena_cava'].numberVal
                  : textObj['inferior_vena_cava'].text
              }`}
            </Text>
          </Billboard>
        )}
      </group>
      {/* TopPart ---> */}
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          name='2'
          geometry={nodes['heart_03_Material_#57_0'].geometry}
          material={nodes['heart_03_Material_#57_0'].material}
        />
        {textObj['left_pulmonary_artery1'].display && (
          <Billboard
            follow={true}
            position={textObj['left_pulmonary_artery1'].position}
            lockX={true}
            lockY={true}
            lockZ={true}
            rotation={textObj['left_pulmonary_artery1'].rotation}>
            <Text
              fontSize={20}
              outlineWidth={'5%'}
              outlineColor='#000000'
              outlineOpacity={1}
              anchorX={textObj['left_pulmonary_artery1'].align}
              anchorY='middle'>
              {`${
                textObj['left_pulmonary_artery1'].number
                  ? textObj['left_pulmonary_artery1'].numberVal
                  : textObj['left_pulmonary_artery1'].text
              }`}
            </Text>
          </Billboard>
        )}
      </group>
    </group>
  );
};

export default Heart;
