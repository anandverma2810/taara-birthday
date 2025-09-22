import backgroundCard from "../assets/images/background5.png";
import tulip from "../assets/images/clawn.png";

import frontCard from "../assets/images/page.jpeg";
import VolumeDownAltIcon from "@mui/icons-material/VolumeDownAlt";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import poem1 from "../assets/audio/poem4.m4a";

import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { POEMS_FOR_HER } from "../utils/constants";
import { TypeAnimation } from "react-type-animation";

const PoemCard = ({ children }) => {
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef(null);

  const handleClick = (e) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - cardRect.left;
    if (clickX > cardRect.width / 2) {
      setFlipped((prev) => !prev);
    }
  };

  // useEffect(() => {
  //   if (flipped) {
  //     setTimeout(() => {
  //       audioRef.current.volume = 0.1;
  //       audioRef.current.play();
  //     }, 4000)
  //   } else {
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0;
  //   }
  // }, [flipped])

  return (
    <Box
      sx={{
        perspective: "1500px",
        width: "13rem",
        height: "20rem",
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
            pl: 5,
            pt: 5, // padding top
            textAlign: "center",
            whiteSpace: "pre-wrap", // keeps poem line breaks
            gap: "1rem",
          }}
        >
          {
            flipped && children
          }
          <Box component={"img"} src={tulip} sx={{
            position: "absolute",
            bottom: "1rem",
            width: "8rem",
            height: "12rem"
          }} />
        </Box>
      </motion.div>
    </Box>
  );
};

export default PoemCard;
