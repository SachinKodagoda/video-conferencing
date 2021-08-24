import Heart from '@components/Heart';
import styles from '@components_style/ThreeWorld.module.sass';
import { AnimationContext } from '@ctx/AnimationContext';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { TTextObj } from '@ts/common';
import { leftTopToCenter } from '@util/common';
import React, { Suspense, useContext, useRef } from 'react';

const ThreeWorld = (): JSX.Element => {
  const { videoWidth, videoHeight, zoom, rotateX, rotateY, rotateZ, animate, handY, handX } =
    useContext(AnimationContext);
  const threeDCanvas = useRef(null);
  const displayAll = true;
  const displayAllNumbers = false;
  const textObj: TTextObj = {
    left_atrium: {
      text: '<--Left atrium',
      position: [60, 0, -100],
      rotation: [0, -300, 0],
      display: displayAll && true,
      number: displayAllNumbers && true,
      numberVal: '(1)',
      align: 'left',
    },
    left_pulmonary_artery1: {
      text: '<--Left pulmonary veins',
      position: [40, 60, -120],
      rotation: [0, -300, 0],
      display: displayAll && true,
      number: displayAllNumbers && true,
      numberVal: '(2)',
      align: 'left',
    },
    left_pulmonary_artery2: {
      text: '<--Left pulmonary veins',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && true,
      number: displayAllNumbers && true,
      numberVal: '(2)',
      align: 'left',
    },
    left_subclavian_artery: {
      text: '<--Left subclavian artery',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(3)',
      align: 'left',
    },
    left_common_carotid_artery: {
      text: '<--Left common carotid artery',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(4)',
      align: 'left',
    },
    aortic_arch: {
      text: '<--Aortic arch',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(5)',
      align: 'left',
    },
    pulmonary_trunk: {
      text: '<--Pulmonary trunk',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(6)',
      align: 'left',
    },
    left_cardiac_vain: {
      text: '<--Left cardiac vain',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(7)',
      align: 'left',
    },
    left_ventricle: {
      text: '<--left ventricle',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(8)',
      align: 'left',
    },
    right_ventricle: {
      text: '<--Right ventricle',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(9)',
      align: 'left',
    },
    inferior_vena_cava: {
      text: 'Inferior vena cava-->',
      position: [-50, -160, 80],
      rotation: [0, -300, 0],
      display: displayAll && true,
      number: displayAllNumbers && true,
      numberVal: '(10)',
      align: 'right',
    },
    right_coronary_artery: {
      text: 'Right coronary artery-->',
      position: [112, -20, 41],
      rotation: [0, -300, 0],
      display: displayAll && true,
      number: displayAllNumbers && true,
      numberVal: '(11)',
      align: 'right',
    },
    right_atrium: {
      text: '<--Right atrium',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(12)',
      align: 'left',
    },
    right_pulmonary_veins: {
      text: '<--Right pulmonary veins',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(13)',
      align: 'left',
    },
    superior_vena_cava: {
      text: '<--Superior vena cava',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(14)',
      align: 'left',
    },
    brachiocephalic_trunk: {
      text: '<--Brachiocephalic trunk',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll && false,
      number: displayAllNumbers && true,
      numberVal: '(15)',
      align: 'left',
    },
  };
  return (
    <Canvas className={styles.threeDCanvas} ref={threeDCanvas}>
      <ambientLight intensity={0.8} />
      <pointLight position={[-500, -500, -500]} intensity={0.8} />
      <pointLight position={[500, 500, 500]} intensity={0.8} />
      <PerspectiveCamera makeDefault position={[0, 0, 200]} rotation={[0, 0, 0]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Heart
          position={[leftTopToCenter(handX, videoWidth, 2, 0), leftTopToCenter(handY, videoHeight, 2, 0), 0]}
          scale={zoom}
          rotateX={rotateX}
          rotateY={rotateY}
          rotateZ={rotateZ}
          animate={animate}
          textObj={textObj}
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeWorld;
