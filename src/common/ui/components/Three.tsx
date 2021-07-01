import styles from '@components_style/Three.module.sass';
import { IHtmlDivElement } from '@ts/interfaces';
import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';

type TProps = {
  x: number;
  y: number;
};

const Three = ({ x = 0, y = 0 }: TProps): JSX.Element => {
  const { useEffect, useRef, useState } = React;
  const ref = useRef<HTMLDivElement>(null);
  const [isAnimating, setAnimating] = useState(true);
  const controls = useRef(null);

  useLayoutEffect(() => {
    const temp = ref as unknown as IHtmlDivElement;
    const width = temp.current.clientWidth;
    const height = temp.current.clientHeight;
    const ratio = width / height;
    let frameId: number | null;

    // scene -->
    const scene = new THREE.Scene();

    // camera -->
    const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
    camera.position.z = 4;

    // renderer -->
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);

    // cube -->
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      renderer.setSize(width, height);
      camera.aspect = ratio;
      camera.updateProjectionMatrix();
      renderScene();
    };

    const animate = () => {
      //   cube.rotation.x += 0.01;
      //   cube.rotation.y += 0.01;
      // eslint-disable-next-line no-console
      console.log('width,height,x,y: =-->', width, height, x, y, ratio);
      const vector = new THREE.Vector3(0, 2, 0);
      // eslint-disable-next-line no-console
      //   console.log('vector: =-->', vector);
      //   vector.unproject(camera);
      //   const dir = vector.sub(camera.position).normalize();
      //   const distance = -camera.position.z / dir.z;
      //   const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      cube.position.copy(vector);
      renderScene();
      frameId = window.requestAnimationFrame(animate);
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

    temp.current.appendChild(renderer.domElement);
    window.addEventListener('resize', handleResize);
    start();
    controls.current = { start, stop };

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      temp.current.removeChild(renderer.domElement);
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    if (isAnimating) {
      controls.current.start();
    } else {
      controls.current.stop();
    }
  }, [isAnimating]);
  return <div ref={ref} className={styles.three} onClick={() => setAnimating(val => !val)} aria-hidden='true' />;
};

export default Three;
