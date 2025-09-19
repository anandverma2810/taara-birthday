import backgroundVideo from "./assets/videos/background.mp4";
import "./App.css";
import { Box, Stack } from "@mui/material";
import CenterCard from "./component/centerCard";
import { useEffect, useRef, useState } from "react";
import Card from "./component/card";
import PoemCard from "./component/poemCard";
import bgMusic1 from "./assets/audio/bgMusic1.mp3";

import TeaseContent from "./component/teaseContent";

function App() {
  const [active, setActive] = useState(1);
  const audioRef = useRef(null);

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, needs user interaction");
      });
    }
  };

  const handleAudioVolume = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.01;
    }
  }

  useEffect(() => {
    handleStartMusic();
  }, [])

  return (
    <div className="app">
      {true ? (
        <Box>
          <video autoPlay loop muted playsInline className="background-video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>

          <audio ref={audioRef} src={bgMusic1} preload="auto" loop />

          <Stack
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              pt: "3rem",
            }}
          >
            <Card key={1} isActive={active === 1} onClick={() => {
              setActive(1);
              audioRef.current.volume = 0.1;
            }}>
              <CenterCard backgroundRef={audioRef} />
            </Card>

            <Card key={2} isActive={active === 2} onClick={() => {
              setActive(2);
              handleAudioVolume();
            }}>
              <PoemCard backgroundRef={audioRef} />
            </Card>
          </Stack>
        </Box>
      ) : (
        <TeaseContent />
      )}
    </div>
  );
}

export default App;
