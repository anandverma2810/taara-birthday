import girlBackground from "../assets/images/aastha.png";
import v1 from "../assets/videos/v3.mp4";
import v2 from "../assets/videos/v2.mp4";
import ballon from "../assets/images/ball.png";
import buttercup from "../assets/images/buttercup.png";
import bgMusic1 from "../assets/audio/bgMusic1.mp3";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import PoemCard from "../component/poemCard";
import Book from "../component/book";
import { AnimatePresence, motion } from "framer-motion";

const OnBirthday = () => {
    const [transition, setTransition] = useState(false);
    const [showButtercup, setShowButtercup] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const songRef = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        !showButtercup && (songRef.current.volume = 0.1);
        setTransition(prev => !prev);
        if (showCards) {
            setShowCards(false);
            setShowButtercup(false);
        }
        setTimeout(() => {
            if (!showCards) {
                setShowButtercup(true);
                setTimeout(() => {
                    setShowCards(true);
                }, 3000);
            }
        }, 2000);
    };

    useEffect(() => {

        if (songRef.current) {
            songRef.current.volume = 0.1;
            songRef.current.play().catch(() => {
                console.log("Autoplay blocked, needs user interaction");
            });
        }
    }, []);

    return (
        <>
            <audio ref={songRef} src={bgMusic1} preload="auto" loop />

            <Box
                component={"video"}
                autoPlay
                loop
                muted
                playsInline
                className="background-video"
                sx={{
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                }}
            >
                <source src={v1} type="video/mp4" />
            </Box>

            <Box
                component={"video"}
                autoPlay
                loop
                muted
                playsInline
                className="background-video"
                sx={{
                    opacity: transition ? 1 : 0,
                    transition: "opacity 2s ease-in-out",
                    position: "fixed",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                }}
            >
                <source src={v2} type="video/mp4" />
            </Box>

            <Box
                component={"img"}
                src={girlBackground}
                alt="background"
                sx={{
                    opacity: transition ? 0 : 1,
                    transform: transition ? "translateY(100%)" : "translateY(0)",
                    transition: "all 2s ease-in-out",
                    position: "fixed",
                    bottom: "-2.5rem",
                    width: "100vw",
                    height: "50%",
                    objectFit: "cover",
                    zIndex: 1,
                }}
            />

            {!showButtercup && (
                <>
                    <Box onClick={handleClick} sx={{
                        position: "fixed",
                        top: "14rem",
                        right: "24rem",
                        width: "25rem",
                        height: "25rem",
                        cursor: "pointer",
                        zIndex: 1,
                    }} />
                    <Box
                        sx={{
                            position: "fixed",
                            top: "14rem",
                            right: "24rem",
                            width: "25rem",
                            height: "25rem",
                            cursor: "pointer",
                            zIndex: 0,
                            transition: "transform 2s ease-in-out, opacity 2s ease-in-out",
                            transform: transition ? "translateY(100vh)" : "translateY(0)",
                            opacity: transition ? 0 : 1,
                        }}
                    >
                        <Box
                            component="img"
                            src={ballon}
                            sx={{
                                zIndex: 0,
                                width: "100%",
                                height: "100%",
                                animation: "floatSwing 4s ease-in-out infinite",
                                "@keyframes floatSwing": {
                                    "0%": { transform: "translateY(0px) translateX(0px)" },
                                    "25%": { transform: "translateY(-10px) translateX(-5px)" },
                                    "50%": { transform: "translateY(0px) translateX(0px)" },
                                    "75%": { transform: "translateY(-10px) translateX(5px)" },
                                    "100%": { transform: "translateY(0px) translateX(0px)" },
                                },
                            }}
                        />
                    </Box>
                </>
            )}
            {showButtercup && (
                <Box onClick={handleClick} sx={{
                    position: "fixed",
                    top: "14rem",
                    right: "24rem",
                    width: "25rem",
                    height: "25rem",
                    cursor: "pointer",
                    zIndex: 1,
                }} >
                    <Box
                        component="img"
                        src={buttercup}
                        sx={{
                            position: "fixed",
                            bottom: 0,
                            left: "50%",
                            width: "10%",
                            height: "22%",
                            animation:
                                "flyIn 2s ease-out forwards, supermanFloat 4s ease-in-out 2s infinite",
                            "@keyframes flyIn": {
                                "0%": { transform: "translateX(-60%) translateY(100%) rotate(-15deg)", opacity: 0 },
                                "50%": { transform: "translateX(-50%) translateY(50%) rotate(5deg)", opacity: 1 },
                                "100%": { transform: "translateX(-50%) translateY(0) rotate(0deg)", opacity: 1 },
                            },
                            "@keyframes supermanFloat": {
                                "0%": { transform: "translateX(-50%) translateY(0) scale(1)" },
                                "50%": { transform: "translateX(-50%) translateY(-25px) scale(1.02)" },
                                "100%": { transform: "translateX(-50%) translateY(0) scale(1)" },
                            },
                            zIndex: 2,
                        }}
                    />
                </Box >

            )}

            <AnimatePresence>
                {showCards && (
                    <motion.div
                        key="book-card" // key ensures re-animation each time it mounts
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: "35%",
                            transform: "translate(-50%, -50%) rotateY(10deg)",
                            zIndex: 3,
                        }}
                    >
                        <Book songRef={songRef} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default OnBirthday;