import { Box, IconButton, Stack } from '@mui/material';
import BirthdayCounter from './birthdayCounter';
import ChangingCaption from './changingCaption';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import audio3 from "../assets/audio/audio3.m4a";
import { useEffect, useRef, useState } from 'react';

const CenterCard = ({ backgroundRef }) => {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = (e) => {
        e.stopPropagation(); // stop card flip if inside flip card
        if (!isPlaying) {
            backgroundRef.current.volume = 0.02;
            audioRef.current.volume = 1;
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            backgroundRef.current.volume = 0.3;
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    // Restore background volume when audio ends
    useEffect(() => {
        const audioEl = audioRef.current;
        const handleEnded = () => {
            backgroundRef.current.volume = 0.3;
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
                    width: "45rem",
                    height: "auto",
                    background: "rgba(255, 255, 255, 0.2)", // semi-transparent
                    backdropFilter: "blur(6px)", // blur effect
                    WebkitBackdropFilter: "blur(8px)", // Safari support
                    border: "0.1rem solid rgba(255, 255, 255, 0.3)", // optional frosted border
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
        </Stack>
    )
}

export default CenterCard;