import styles from '@layouts_style/MainRightBar.module.sass';
import React from 'react';

const MainRightBar = (): JSX.Element => {
  const messageArray = [
    {
      message: 'Hi',
      time: '',
    },
    {
      message: 'Test',
      time: '',
    },
  ];
  return (
    <div className={styles.videoMenuRight}>
      <div className={styles.chatItemCover}>
        {messageArray.map((item, index) => (
          <div key={`chatItem-${index + 1}`} className={styles.chatItem}>
            {item.message}
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input type='text' className={styles.chatInputItem} />
      </div>
    </div>
  );
};

export default MainRightBar;
