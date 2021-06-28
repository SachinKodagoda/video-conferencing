import styles from '@pages_style/index.module.sass';
import Link from 'next/link';
import React from 'react';
import NavBar from 'src/common/ui/layouts/NavBar';

const index = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className={styles.body}>
        <Link href='/design'>Design Now</Link>
      </div>
    </>
  );
};

export default index;
