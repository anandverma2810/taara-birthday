
import backgroundCard from "../assets/images/background.jpeg";
import frontCard from "../assets/images/front.jpeg";


import React, { useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const PoemCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = (e) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - cardRect.left;
    if (clickX > cardRect.width / 2) {
      setFlipped((prev) => !prev); // flip only if right side clicked
    }
  };

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
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${frontCard})`,
            color: "#53565b",
            fontSize: "1.1rem",
            fontWeight:"bold",
            
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            px: 3,
            textAlign: "center",
          }}
        >
          🌸 This is the back side.
          Your full poem can go here with glass effect ✨
        </Box>
      </motion.div>
    </Box>
  );
};

export default PoemCard;

