import React, { useState } from "react";
import "./Metronome.css";
import click1 from "./click1.wav";

let timer = null;
export default function Metronome() {
  const audioClick1 = new Audio(click1);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);

  const handleBpmChange = (event) => {
    const bpm = event.target.value;
    setBpm(bpm);

    if (playing) {
      // Stop the old timer and start a new one
      clearInterval(timer);
      timer = setInterval(playClick, (60 / bpm) * 1000);

      // Set the new BPM
      setBpm(bpm);
    } else {
      // Otherwise just update the BPM
      setBpm(bpm);
    }
  };

  const playClick = () => {
    audioClick1.play();
  };

  const startStop = () => {
    if (playing) {
      // Stop the timer
      clearInterval(timer);
      setPlaying(false);
    } else {
      // Start a timer with the current BPM
      timer = setInterval(playClick, (60 / bpm) * 1000);

      setPlaying(true);
      playClick();
    }

    audioClick1.play();
  };

  return (
    <div className="metronome">
      <div className="bpm-slider">
        <div>{bpm} BPM</div>
        {/* Add the onClick handler: */}
        <input
          type="range"
          min="60"
          max="240"
          onChange={handleBpmChange}
          value={bpm}
        />
      </div>
      <button onClick={startStop}>{playing ? "Stop" : "Start"}</button>
    </div>
  );
}
