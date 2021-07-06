import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (): JSX.Element => {
  const { listening, resetTranscript, transcript } = useSpeechRecognition();

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening()} type='button'>
        Start
      </button>
      <button onClick={() => SpeechRecognition.stopListening()} type='button'>
        Stop
      </button>
      <button onClick={() => resetTranscript()} type='button'>
        Reset
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
