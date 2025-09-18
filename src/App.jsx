import backgroundVideo from "./assets/videos/background.mp4";
import "./App.css";
import { Box, Stack } from "@mui/material";
import CenterCard from "./component/centerCard";
import { useState } from "react";
import Card from "./component/card";
import PoemCard from "./component/poemCard";

import TeaseContent from "./component/teaseContent";

function App() {
  const [active, setActive] = useState(1);

  return (
    <div className="app">
      {false ? (
        <Box>
          <video autoPlay loop muted playsInline className="background-video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>

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
            <Card key={1} isActive={active === 1} onClick={() => setActive(1)}>
              <CenterCard />
            </Card>

            <Card key={2} isActive={active === 2} onClick={() => setActive(2)}>
              <PoemCard />
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
