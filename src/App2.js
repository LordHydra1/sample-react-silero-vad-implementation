import React, { useState } from "react";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { ort } from "@ricky0123/vad-web/dist/real-time-vad";
import makePost from "./api";

function App2() {
  const [audioList, setAudioList] = useState([]);
  const [error, setError] = useState("");
  const [startRecording, setStartRecording] = useState(true);
  const [transcription, setTranscription] = useState("");

  ort.env.wasm.wasmPaths = {
    "ort-wasm-simd-threaded.wasm": "/ort-wasm-simd-threaded.wasm",
    "ort-wasm-simd.wasm": "/ort-wasm-simd.wasm",
    "ort-wasm.wasm": "/ort-wasm.wasm",
    "ort-wasm-threaded.wasm": "/ort-wasm-threaded.wasm",
  };

  const vad = useMicVAD({
    redemptionFrames: 64,
    positiveSpeechThreshold: 0.5,
    workletURL: "/static/js/vad.worklet.bundle.min.js",
    modelURL: "/static/js/silero_vad.onnx",
    onVADMisfire: () => console.log("VAD misfire"),
    onSpeechStart: () => console.log("Speech start"),
    onSpeechEnd: async (audio) => {
      console.log("Speech end");
      const wavBuffer = utils.encodeWAV(audio);
      console.log("test", wavBuffer);
      const base64 = utils.arrayBufferToBase64(wavBuffer);
      const url = `data:audio/wav;base64,${base64}`;
      const formData = new FormData();
      formData.append(
        "file",
        new File([wavBuffer], "speech.wav", { type: "audio/wav" })
      );
      try {
        const post = await makePost(formData);
        console.log("returned result", post);
        setTranscription(post.message);
        setAudioList((old) => [url, ...old]);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onError: (e) => setError(e.message),
  });

  const toggle = () => {
    if (startRecording === true) {
      vad.pause();
      setStartRecording(false);
    } else {
      vad.start();
      setStartRecording(true);
    }
  };

  return (
    <div>
      <h1>Voice Activity Detection Example</h1>
      {error && <p>Error: {error}</p>}
      <button onClick={toggle} disabled={vad.loading}>
        {startRecording ? "Stop Listening" : "Start Listening"}
      </button>
      {transcription && <h1>{transcription}</h1>}

      <ul>
        {audioList.map((audioURL, index) => (
          <li key={index}>
            <audio controls src={audioURL} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App2;
