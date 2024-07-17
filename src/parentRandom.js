import React, { useState } from 'react';
import WaveSurferComponent from './wavesurf';

const ParentComponent = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div style={{width: '400px'}}>
      <button onClick={handleRecord}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <WaveSurferComponent isRecording={isRecording} />
    </div>
  );
};

export default ParentComponent;
