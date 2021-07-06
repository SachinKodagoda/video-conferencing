import EllipsisAnimator from '@components/EllipsisAnimator';
import { AudioContext } from '@ctx/AudioContext';
import styles from '@layouts_style/MainRightBar.module.sass';
import React, { useContext } from 'react';

const MainRightBar = (): JSX.Element => {
  const { action, microphoneOn } = useContext(AudioContext);
  const messageArray = [
    {
      message: 'Hi',
    },
    {
      message: 'Test',
    },
  ];
  let text = 'Turn your MIC on';
  if (microphoneOn) {
    text = '';
  }
  return (
    <div className={styles.videoMenuRight}>
      <div className={styles.chatItemCover}>
        {messageArray.map((item, index) => (
          <div key={`chatItem-${index + 1}`} className={styles.chatItem}>
            {item.message}
          </div>
        ))}
      </div>
      {microphoneOn && (
        <div className={styles.waiting}>
          <EllipsisAnimator text='Listening' />
          <div>{action ? `${action}` : `${text}`}</div>
        </div>
      )}
      <div className={styles.chatInput}>
        <input type='text' className={styles.chatInputItem} />
      </div>
    </div>
  );
};

export default MainRightBar;
