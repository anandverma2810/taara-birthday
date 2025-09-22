import { Box } from "@mui/material";
import fire from "../assets/videos/fire.mp4";
import cracker from "../assets/audio/cracker.mp3";
import { useEffect, useRef, useState } from "react";

const BirthdayCrack = () => {
    const crackRef = useRef(null);

    useEffect(() => {
        if (crackRef.current) {
            crackRef.current.volume = 1;
            crackRef.current.play().catch(() => {
                console.log("Autoplay blocked, needs user interaction");
            });
        }
    }, []);

    const [index, setIndex] = useState(0);
    const fadeMessages = [
        "Happy Birthday Taara! 🎉",
        "Wishing you a day filled with love and joy! 💖",
        "May all your dreams come true! 🌟",
        "Here's to another year of amazing adventures! 🥳",
        "You deserve all the happiness in the world! 🌈",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % fadeMessages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <audio ref={crackRef} src={cracker} preload="auto" loop />
            <Box
                sx={{
                    position: "fixed",
                    top: "20%",
                    left: "50%",
                    width:"100vw",
                    transform: "translateX(-50%) translateY(50%)",
                    zIndex: 2, // above the video
                    textAlign: "center",
                    pointerEvents: "none", // ignore clicks
                }}
            >
                <h2
                    key={index}
                    style={{
                        fontSize: "4rem",
                        fontWeight: "bold",
                        fontFamily: "'Pacifico', cursive",
                        color: "#fff",
                        textShadow: "3px 3px 10px rgba(0,0,0,0.7), 0 0 15px #ffccff",
                        animation: "fadeInOut 5s ease-in-out",
                        letterSpacing: "2px",
                    }}
                >
                    {fadeMessages[index]}
                </h2>

            </Box>

            {/* Background video */}
            <Box
                component="video"
                autoPlay
                loop
                muted
                playsInline
                className="background-video"
                sx={{
                    transition: "opacity 2s ease-in-out",
                    // position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                }}
            >
                <source src={fire} type="video/mp4" />
            </Box>
        </>
    );
};

export default BirthdayCrack;
