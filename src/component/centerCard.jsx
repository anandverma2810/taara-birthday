import { Box, IconButton, Stack } from '@mui/material';
import BirthdayCounter from './birthdayCounter';
import ChangingCaption from './changingCaption';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import audio3 from "../assets/audio/play2.m4a";
import video from "../assets/videos/msg1.mov";

import { useEffect, useRef, useState } from 'react';

const CenterCard = ({ backgroundRef }) => {
    const [flipped, setFlipped] = useState(false);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const handlePlayClick = (e) => {
        e.stopPropagation(); // stop card flip if inside flip card
        setFlipped((prev) => !prev);

        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        }, 800);
        // if (!isPlaying) {
        //     backgroundRef.current.volume = 0.01;
        //     audioRef.current.volume = 1;
        //     audioRef.current.play();
        //     setIsPlaying(true);
        // } else {
        //     backgroundRef.current.volume = 0.1;
        //     audioRef.current.pause();
        //     audioRef.current.currentTime = 0;
        //     setIsPlaying(false);
        // }
    };

    const handleFlipBack = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setFlipped(false);
    };

    // Restore background volume when audio ends
    useEffect(() => {
        const audioEl = audioRef.current;
        const handleEnded = () => {
            backgroundRef.current.volume = 0.1;
            setIsPlaying(false);
        };

        if (audioEl) {
            audioEl.addEventListener("ended", handleEnded);
        }

        return () => {
            if (audioEl) {
                audioEl.removeEventListener("ended", handleEnded);
            }
        };
    }, []);

    return (
        <Stack direction={"column"}>
            <audio ref={audioRef} src={audio3} preload="auto" />

            <Box
                sx={{
                    perspective: "1500px", // needed for 3D flip
                    width: "45rem",
                    height: "30rem",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.8s ease-in-out",
                        transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)",
                    }}
                >
                    {/* FRONT SIDE */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(6px)",
                            WebkitBackdropFilter: "blur(8px)",
                            border: "0.1rem solid rgba(255, 255, 255, 0.3)",
                            borderRadius: "2rem",
                            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            pt: "5rem",
                            pb: "3rem",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <BirthdayCounter />
                        <ChangingCaption />
                        <IconButton
                            onClick={handlePlayClick}
                            disableTouchRipple
                            disableRipple
                            disableFocusRipple
                            sx={{
                                backdropFilter: "blur(6px)", // blur effect,
                                border: "0.1rem solid rgba(255, 255, 255, 0.3)", // optional frosted border
                                borderRadius: "2rem",
                                mt: "1rem",
                                p: "0.2rem",
                                "&:focus": {
                                    outline: "none!important",
                                    boxShadow: "none!important",
                                },
                            }}>
                            <PlayIcon sx={{
                                fontSize: "4rem",
                                color: "#d1d0cd",
                                // background: "rgba(255, 255, 255, 0.2)", // semi-transparent

                            }}
                            />
                        </IconButton>
                    </Box>

                    {/* BACK SIDE */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.7)",
                            color: "white",
                            borderRadius: "2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            transform: "rotateX(180deg)",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <video
                            ref={videoRef}
                            width="100%"
                            height="100%"
                            controls
                            style={{ borderRadius: "2rem", objectFit: "cover" }}
                            onEnded={handleFlipBack}
                        >
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                </Box>
            </Box>
        </Stack>
    )
}

export default CenterCard;