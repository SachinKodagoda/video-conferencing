import { create, SpeechCommandRecognizer } from '@tensorflow-models/speech-commands';
import React, { useEffect, useState } from 'react';

type TProps = {
  children: JSX.Element;
};

interface IContext {
  model: SpeechCommandRecognizer | null;
  action: string | null;
  labels: string[];
  microphoneOn: boolean;
  setMicrophoneOn: React.Dispatch<React.SetStateAction<boolean>>;
  setModel: React.Dispatch<React.SetStateAction<SpeechCommandRecognizer | null>>;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
  recognizeCommands: () => Promise<void | null>;
}

const initContext: IContext = {
  model: null,
  action: null,
  labels: [],
  microphoneOn: false,
  setMicrophoneOn: () => null,
  setModel: () => null,
  setAction: () => null,
  setLabels: () => null,
  recognizeCommands: async () => null,
};

export const AudioContext = React.createContext<IContext>(initContext);

export const AudioContextProvider = ({ children }: TProps): React.ReactElement => {
  const [model, setModel] = useState(initContext.model);
  const [action, setAction] = useState(initContext.action);
  const [labels, setLabels] = useState(initContext.labels);
  const [microphoneOn, setMicrophoneOn] = useState(initContext.microphoneOn);
  //   const [messageArray, setMessageArray] = useState();

  const loadModel = async () => {
    const recognizer = await create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  const argMax = (arr: string[]) => {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  };
  const setTheAction = async (val: string | null) => {
    setAction(val);
  };

  const recognizeCommands = async () => {
    setMicrophoneOn(true);
    if (model) {
      model.listen(
        result => {
          return setTheAction(labels[argMax(Object.values(result.scores))]);
        },
        { includeSpectrogram: true, probabilityThreshold: 0.7 }
      );
      setTimeout(() => {
        setMicrophoneOn(false);
        model.stopListening();
      }, 10e3);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const contextValue = {
    model,
    action,
    labels,
    microphoneOn,
    setMicrophoneOn,
    setModel,
    setAction,
    setLabels,
    recognizeCommands,
  };

  return <AudioContext.Provider value={contextValue}>{children}</AudioContext.Provider>;
};
