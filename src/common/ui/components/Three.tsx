import styles from '@components_style/Three.module.sass';
import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';

type TProps = {
  x: number;
  y: number;
};

let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let geometry: THREE.BoxGeometry;
let material: THREE.MeshBasicMaterial;
let cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
let frameId: number | null;
let currentDiv: HTMLDivElement;
const xMiddle = 0;
const yMiddle = 0;
const scaler = 10; // 1 is this amount of px
const divider = scaler * 2;
const near = 0;
const cameraPos = 4;
const far = divider;
let width: number;
let height: number;
let xRatio: number; // width / (scaler * 2)
let yRatio: number; // height / (scaler * 2)
let left: number; // -xRatio
let right: number; // +xRatio
let bottom: number; // -yRatio
let top: number; // +yRatio

const yAxis = (y: number, h: number): number => {
  return y > h / 2 ? -y / 8 : y / 8;
};
const xAxis = (x: number, w: number): number => {
  return x > w / 2 ? -x / 8 : x / 8;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Three = ({ x, y }: TProps): JSX.Element => {
  const { useEffect, useRef } = React;
  const temp = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);
  // eslint-disable-next-line no-console
  // console.log('x,y: =-->', x, y);

  useLayoutEffect(() => {
    currentDiv = temp.current as unknown as HTMLDivElement;
    width = currentDiv.clientWidth || 1;
    height = currentDiv.clientHeight || 1;
    xRatio = width / divider;
    yRatio = height / divider;
    // eslint-disable-next-line no-console
    console.log('width,height: =-->', width, height);

    // scene -->
    scene = new THREE.Scene();

    // camera -->
    // camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
    left = xRatio * -1;
    right = xRatio;
    top = yRatio;
    bottom = yRatio * -1;
    camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    camera.position.z = cameraPos;

    // renderer -->
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);

    // cube -->
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const handleResize = () => {
      width = currentDiv.clientWidth || 1;
      height = currentDiv.clientHeight || 1;
      // ratio = width / height;
      renderer.setSize(width, height);
      // camera.aspect = ratio;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const animate = () => {
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      const vector = new THREE.Vector3(xMiddle, yMiddle, 0);
      cube.position.copy(vector);
      frameId = window.requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = null;
    };

    currentDiv.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);
    start();
    const increase = () => {
      // cube.scale.x += 1;
      // cube.scale.y += 1;
      // cube.scale.z += 1;
      cube.translateY(1);
    };
    const decrease = () => {
      // cube.scale.x -= 1;
      // cube.scale.y -= 1;
      // cube.scale.z -= 1;
      cube.translateY(-1);
    };
    controls.current = { start, stop, increase, decrease };

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      currentDiv.removeChild(renderer.domElement);
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    // if (isAnimating) {
    //   // controls.current.start();
    //   controls.current.increase();
    // } else {
    //   // controls.current.stop();
    //   controls.current.decrease();
    // }
    // eslint-disable-next-line no-console
    console.log('x:', x, width / 2, xAxis(x, width / 2), 'y:', y, height / 2, yAxis(y, height / 2));
  }, [x, y]);

  return <div ref={temp} className={styles.three} aria-hidden='true' />;
};

export default Three;
