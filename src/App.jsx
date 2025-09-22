import { Box, Fade } from "@mui/material";
import "./App.css";
import RightPageBook from "./component/book";
import BeforeBirthday from "./pages/beforeBirthday";
import OnBirthday from "./pages/onBirthday";
import BirthdayCrack from "./pages/birthdayCrack";
import { useEffect, useState } from "react";

function App() {
  const deadline = new Date("2025-09-23T00:00:00").getTime();
  const [view, setView] = useState("before"); // "before" | "crack" | "on"

  useEffect(() => {
    const now = Date.now();

    if (now < deadline) {
      // before deadline, just show BeforeBirthday
      setView("before");
      return;
    }

    // After deadline sequence
    setView("before"); // start with before

    // After 30s → switch to crack
    const crackTimer = setTimeout(() => {
      setView("crack");
    }, 10000);

    // After 60s → switch to on
    const onTimer = setTimeout(() => {
      setView("on");
    }, 60000);

    return () => {
      clearTimeout(crackTimer);
      clearTimeout(onTimer);
    };
  }, [deadline]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {view === "before" && <BeforeBirthday />}

        <Fade in={view === "crack"} timeout={4000} unmountOnExit>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <BirthdayCrack />
          </Box>
        </Fade>

        <Fade in={view === "on"} timeout={6000} unmountOnExit>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <OnBirthday />
          </Box>
        </Fade>
      </Box>
    </>
  );
}

export default App;
