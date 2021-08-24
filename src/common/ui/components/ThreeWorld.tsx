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
  const displayAllNumbers = true;
  const textObj: TTextObj = {
    left_atrium: {
      text: '<--Left atrium',
      position: [60, 0, -100],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(1)',
      align: 'left',
    },
    left_pulmonary_artery1: {
      text: '<--Superior left pulmonary veins',
      position: [40, 60, -120],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(2)',
      align: 'left',
    },
    left_pulmonary_artery2: {
      text: '<--Inferior left pulmonary veins',
      position: [0, 30, -140],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(2)',
      align: 'left',
    },
    left_subclavian_artery: {
      text: '<--Left subclavian artery',
      position: [-20, 150, -32],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(3)',
      align: 'left',
    },
    left_common_carotid_artery: {
      text: '<--Left common carotid artery',
      position: [4, 170, -10],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(4)',
      align: 'left',
    },
    aortic_arch: {
      text: '<--Aortic arch',
      position: [20, 120, -28],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(5)',
      align: 'left',
    },
    pulmonary_trunk: {
      text: 'Pulmonary trunk-->',
      position: [110, 30, 10],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(6)-->',
      align: 'right',
    },

    left_cardiac_vain: {
      text: '<--Left cardiac vain',
      position: [110, -50, -60],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(7)',
      align: 'left',
    },
    left_ventricle: {
      text: '<--left ventricle',
      position: [80, -100, -130],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(8)',
      align: 'left',
    },
    right_ventricle: {
      text: 'Right ventricle-->',
      position: [20, -110, 90],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(9)-->',
      align: 'right',
    },
    inferior_vena_cava: {
      text: 'Inferior vena cava-->',
      position: [-50, -160, 80],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(10)-->',
      align: 'right',
    },
    right_coronary_artery: {
      text: 'Right coronary artery-->',
      position: [112, -20, 41],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(11)-->',
      align: 'right',
    },
    right_atrium: {
      text: 'Right atrium-->',
      position: [55, 10, 111],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(12)-->',
      align: 'right',
    },
    right_pulmonary_vein1: {
      text: 'Inferior right pulmonary vein-->',
      position: [-70, -10, 120],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(13)-->',
      align: 'right',
    },
    right_pulmonary_vein2: {
      text: 'Superior Right pulmonary vein-->',
      position: [-60, 24, 130],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(13)-->',
      align: 'right',
    },
    superior_vena_cava: {
      text: 'Superior vena cava -->',
      position: [30, 100, 90],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(14)-->',
      align: 'right',
    },
    brachiocephalic_trunk: {
      text: 'Brachiocephalic trunk-->',
      position: [40, 170, 10],
      rotation: [0, -350, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(15)-->',
      align: 'right',
    },
    right_pulmonary_artery: {
      text: 'Right pulmonary artery-->',
      position: [-54, 65, 120],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '(16)-->',
      align: 'right',
    },
    left_pulmonary_artery: {
      text: '<--Left pulmonary artery',
      position: [-10, 80, -100],
      rotation: [0, -300, 0],
      display: displayAll || false,
      number: displayAllNumbers || false,
      numberVal: '<--(17)',
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
