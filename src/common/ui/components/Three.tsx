import styles from '@components_style/Three.module.sass';
import React, { useEffect, useLayoutEffect } from 'react';
import * as THREE from 'three';

type TProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fullSize: {
    width: number;
    height: number;
  };
};

let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let geometry: THREE.BoxGeometry;
let material: THREE.MeshBasicMaterial;
let cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
let frameId: number | null;
let currentDiv: HTMLDivElement;
const scaler = 100; // 1 is 100px
const divider = scaler * 2;
const near = 0;
const cameraPos = 4;
const far = divider;
let xRatio: number; // width / (scaler * 2)
let yRatio: number; // height / (scaler * 2)
let left: number; // -xRatio
let right: number; // +xRatio
let bottom: number; // -yRatio
let top: number; // +yRatio

const yAxis = (y: number, h: number): number => {
  const gap = h / divider - y / scaler;
  return y > h / 2 ? gap : gap;
};
const xAxis = (x: number, w: number): number => {
  const gap = w / divider - x / scaler;
  return x > w / 2 ? gap : gap;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Three = ({ fullSize, height, width, x, y }: TProps): JSX.Element => {
  // eslint-disable-next-line no-console
  // console.log('fullSize: =-->', height, width);
  const { useRef } = React;
  const temp = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);
  // eslint-disable-next-line no-console
  // console.log('x,y: =-->', xAxis(x, width), yAxis(y, height));

  useLayoutEffect(() => {
    currentDiv = temp.current as unknown as HTMLDivElement;
    xRatio = width / divider;
    yRatio = height / divider;
    // eslint-disable-next-line no-console
    // console.log('width,height: =-->', width, height);

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

    // light-->
    const light = new THREE.AmbientLight(0x404040, 100);
    scene.add(light);

    const handleResize = () => {
      renderer.setSize(width, height);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      // const vector = new THREE.Vector3(0, 0, 0);
      // cube.position.copy(vector);
      frameId = window.requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const restart = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = null;
    };

    currentDiv?.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);
    start();

    const change = (xTemp: number, yTemp: number) => {
      const vector = new THREE.Vector3(xAxis(xTemp, width), yAxis(yTemp, height), 0);
      cube.position.copy(vector);
      restart();
    };

    controls.current = { change };

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      currentDiv?.removeChild(renderer.domElement);
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controls.current.change(x, y);
  }, [x, y]);

  return <div ref={temp} className={styles.three} aria-hidden='true' style={{ width, height }} />;
};

export default Three;
