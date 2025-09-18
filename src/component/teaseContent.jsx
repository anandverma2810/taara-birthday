import { Box } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import teaseBackground from "../assets/images/duck.jpeg";
import bgMusic from "../assets/audio/bgMusic.mp3";
import { useRef } from "react";

const TeaseContent = () => {
    const audioRef = useRef(null);

    const handleStartMusic = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                console.log("Autoplay blocked, needs user interaction");
            });
        }
    };

    const handleStopMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // reset playback
        }
    };
    return <Box
        sx={{
            height: "100vh",
            width: "100vw",
            background: `url(${teaseBackground}) center/cover no-repeat`,
        }}
    >
        <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            pr: "5rem",
            height: "100vh"
        }}>
            <div
                style={{
                    fontSize: "6rem",
                    fontWeight: "bold",
                    color: "white",
                    lineHeight: "1.2",
                    whiteSpace: "pre-line", // 👈 preserve newlines
                    textAlign: "center"
                }}
            >
                <audio ref={audioRef} src={bgMusic} preload="auto" loop />

                <TypeAnimation
                    sequence={[
                        () => handleStartMusic(),
                        "What?", 500,
                        "Boondi ke \n ladoo.", 3000,         // 👈 force newline
                        "Have some \n patience", 3000,      // 👈 force newline
                        "Check this\n after", 500,          // 👈 force newline
                        "9 PM\n today.", 2000,
                        "hihiihii...", 4000,
                    ]}
                    wrapper="div"
                    cursor={true}
                    repeat={0}
                />
            </div>
        </Box>
    </Box>
}

export default TeaseContent;

