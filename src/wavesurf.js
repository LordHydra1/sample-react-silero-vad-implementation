import React, { useEffect, useState } from 'react';
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";

const WaveSurferComponent = ({ isRecording }) => {
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [recordInstance, setRecordInstance] = useState(null);

  useEffect(() => {
    const createWaveSurfer = () => {
      if (waveSurfer) {
        waveSurfer.destroy();
      }

      const ws = WaveSurfer.create({
        container: "#mic",
        waveColor: "purple",
        progressColor: "#ff9b00",
        barHeight: 3,
        barGap: 10,
        barWidth: 5,
        height:'50px',
        width:'100%',
        minPxPerSec: 1,
        hideScrollbar: true,
      });

      const record = ws.registerPlugin(
        RecordPlugin.create({ scrollingWaveform: true, renderRecordedAudio: false })
      );

      record.on("record-progress", (time) => {
        const formattedTime = [
          Math.floor((time % 3600000) / 60000), // minutes
          Math.floor((time % 60000) / 1000), // seconds
        ]
          .map((v) => (v < 10 ? "0" + v : v))
          .join(":");

        // Update progress
      });

      setWaveSurfer(ws);
      setRecordInstance(record);
    };

    createWaveSurfer();

    return () => {
      if (waveSurfer) {
        waveSurfer.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      if (recordInstance && !recordInstance.isRecording()) {
        recordInstance.startRecording();
      }
    } else {
      if (recordInstance && recordInstance.isRecording()) {
        recordInstance.stopRecording();
      }
    }
  }, [isRecording, recordInstance]);

  return (
    <div id="mic"></div>
  );
};

export default WaveSurferComponent;
