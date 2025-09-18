import React from "react";
import { motion } from "framer-motion";

export default function Card({ isActive, onClick, children }) {
    return (
        <motion.div
            onClick={onClick}
            animate={{
                height: isActive ? 430 : 50,
                scale: isActive ? 1 : 0.40,
                zIndex: isActive ? 2 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
            }}
            style={{
                cursor: "pointer",
            }}
        >
            {children}
        </motion.div>
    );
}
