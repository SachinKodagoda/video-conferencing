import { AudioContext } from '@ctx/AudioContext';
import styles from '@layouts_style/MainBottomBar.module.sass';
import React, { useContext, useState } from 'react';
import SpeechRecognition from 'react-speech-recognition';

type TProps = {
  videoOn: boolean;
  showLeftBar: boolean;
  showRightBar: boolean;
  setVideoOn: (x: boolean) => void;
  setShowLeftBar: (x: boolean) => void;
  setShowRightBar: (x: boolean) => void;
};
const MainBottomBar = ({
  setShowLeftBar,
  setShowRightBar,
  setVideoOn,
  showLeftBar,
  showRightBar,
  videoOn,
}: TProps): JSX.Element => {
  const [threeMenuOn, setThreeMenuOn] = useState(false);
  const [settingsMenuOn, setSettingsMenuOn] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const { isMicDisabled, microphoneOn, setMicrophoneOn } = useContext(AudioContext);

  const videoIcon = videoOn ? 'videoCameraActive' : 'videoCamera';
  const streamingIcon = streaming ? 'streamingActive' : 'streaming';
  const microphoneIcon = microphoneOn ? 'microphoneActive' : 'microphone';
  const threeMenuIcon = threeMenuOn ? '3dActive' : '3d';
  const settingsMenuIcon = settingsMenuOn ? 'settingsActive' : 'settings';
  const usersIcon = showLeftBar ? 'groupActive' : 'group';
  const messageIcon = showRightBar ? 'messageActive' : 'message';
  return (
    <div className={styles.bottomBar}>
      <div className={styles.left}>
        <img
          src={`/images/${threeMenuIcon}.svg`}
          alt=''
          className={styles.leftIcons}
          onMouseEnter={() => {
            setThreeMenuOn(true);
          }}
          onMouseLeave={() => {
            setThreeMenuOn(false);
          }}
        />
        <img
          src={`/images/${settingsMenuIcon}.svg`}
          alt=''
          className={styles.leftIcons}
          onMouseEnter={() => {
            setSettingsMenuOn(true);
          }}
          onMouseLeave={() => {
            setSettingsMenuOn(false);
          }}
          aria-hidden='true'
        />
      </div>
      <div className={styles.middle}>
        <img
          src={`/images/${videoIcon}.svg`}
          alt=''
          className={styles.middleIcons}
          onClick={() => {
            const tempState = videoOn;
            setVideoOn(!tempState);
          }}
          aria-hidden='true'
        />
        <img
          src={`/images/${streamingIcon}.svg`}
          alt=''
          className={styles.middleIcons}
          onClick={() => {
            // setStreaming(!streaming);
            SpeechRecognition.stopListening();
          }}
          aria-hidden='true'
        />
        <img
          src={`/images/${microphoneIcon}.svg`}
          alt=''
          className={`${styles.middleIcons} ${isMicDisabled ? styles.disabled : ''}`}
          onClick={() => {
            if (!isMicDisabled) {
              setMicrophoneOn(prev => !prev);
            }
          }}
          aria-hidden='true'
        />
      </div>
      <div className={styles.right}>
        <img
          src={`/images/${usersIcon}.svg`}
          alt=''
          className={styles.rightIcons}
          onClick={() => {
            setShowLeftBar(!showLeftBar);
          }}
          aria-hidden='true'
        />
        <img
          src={`/images/${messageIcon}.svg`}
          alt=''
          className={styles.rightIcons}
          onClick={() => {
            setShowRightBar(!showRightBar);
          }}
          aria-hidden='true'
        />
      </div>
    </div>
  );
};

export default MainBottomBar;
