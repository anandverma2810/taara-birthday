import backgroundCard from "../assets/images/background2.jpeg";
import tulip from "../assets/images/tulip.png";

import frontCard from "../assets/images/front.jpeg";
import VolumeDownAltIcon from "@mui/icons-material/VolumeDownAlt";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import poem1 from "../assets/audio/poem2.m4a";

import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { POEMS_FOR_HER } from "../utils/constants";
import { TypeAnimation } from "react-type-animation";

const PoemCard = ({ _flipped, backgroundRef }) => {
  const [flipped, setFlipped] = useState(_flipped);
  const audioRef = useRef(null);

  const handleClick = (e) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - cardRect.left;
    if (clickX > cardRect.width / 2) {
      setFlipped((prev) => !prev);
    }
  };

  useEffect(() => {
    if (flipped) {
      setTimeout(() => {
        audioRef.current.volume = 0.1;
        audioRef.current.play();
      }, 4000)
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [flipped])

  return (
    <Box
      sx={{
        perspective: "1500px",
        width: "28rem",
        height: "40rem",
        cursor: "pointer",
        position: "relative",
      }}
      onClick={handleClick}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* FRONT SIDE */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "2rem",
            overflow: "hidden",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backfaceVisibility: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${backgroundCard})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              zIndex: 1,
            }}
          />
        </Box>

        {/* BACK SIDE */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "2rem",
            overflow: "hidden",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column", // stack items vertically
            alignItems: "center",
            justifyContent: "flex-start", // content starts from top
            backgroundImage: `url(${frontCard})`,
            color: "#53565b",
            fontSize: "1rem",
            fontWeight: "bold",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            px: 2,
            pt: 2, // padding top
            textAlign: "center",
            whiteSpace: "pre-wrap", // keeps poem line breaks
            gap: "1rem",
          }}
        >
          <audio ref={audioRef} src={poem1} preload="auto" />

          {/* <IconButton
            disableTouchRipple
            disableRipple
            disableFocusRipple
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              backdropFilter: "blur(6px)",
              border: "0.1rem solid rgba(255, 255, 255, 0.3)",
              borderRadius: "2rem",
              p: "0.2rem",
              "&:focus": {
                outline: "none!important",
                boxShadow: "none!important",
              },
            }}
            onClick={handlePlayClick}
          >
            {!isPlaying ? (
              <VolumeMuteIcon sx={{ fontSize: "2rem" }} />
            ) : (
              <VolumeDownAltIcon sx={{ fontSize: "2rem" }} />
            )}
          </IconButton> */}

          {/* Poem content below */}
          {flipped && (
            <TypeAnimation
              sequence={[POEMS_FOR_HER["2025-09-19"], 2000]} // type the poem, wait 2s
              speed={185} // slow dramatic typing
              style={{
                display: "block",
                whiteSpace: "pre-wrap",
                marginTop: "4rem", // leave space below the button
              }}
              cursor={true} // blinking cursor
            />
          )}

          <Box component={"img"} src={tulip} sx={{
            position: "absolute",
            bottom: "1rem",
            width: "8rem",
            height: "15rem"
          }} />
        </Box>
      </motion.div>
    </Box>
  );
};

export default PoemCard;
