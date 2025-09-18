// import React, { useEffect, useState } from "react";
// import { Box } from '@mui/material';
// import "./style.css";

// // Set your start and target dates
// const START_DATE = new Date("2025-09-01T00:00:00");
// const TARGET_DATE = new Date("2025-09-23T00:00:00");

// const size = 320; // SVG viewbox square
// const stroke = 18;
// const radius = (size - stroke) / 2;
// const circumference = 2 * Math.PI * radius;

// function getTimeDiffParts(target) {
//     const now = new Date();
//     const diffMs = Math.max(target - now, 0);
//     const diffSec = Math.floor(diffMs / 1000);
//     const days = Math.floor(diffSec / (24 * 3600));
//     const hours = Math.floor((diffSec % (24 * 3600)) / 3600);
//     const minutes = Math.floor((diffSec % 3600) / 60);
//     const seconds = diffSec % 60;
//     return { diffMs, days, hours, minutes, seconds };
// }

// const BirthdayProgress = () => {
//     const [time, setTime] = useState(() => getTimeDiffParts(TARGET_DATE));
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         const update = () => {
//             const now = new Date();

//             const elapsed = now - START_DATE;
//             const total = TARGET_DATE - START_DATE;
//             const pct = Math.max(0, Math.min(1, elapsed / total));
//             setProgress(pct * 100);

//             setTime(getTimeDiffParts(TARGET_DATE));
//         };

//         update();
//         const timer = setInterval(update, 1000);
//         return () => clearInterval(timer);
//     }, []);

//     const offset = circumference - (progress / 100) * circumference;

//     return (
//         <Box className="card">
//             <Box className="center">
//                 <Box className="inner-circle">
//                     <Box className="icon">🎂</Box>
//                     <h2 className="title">BIRTHDAY</h2>
//                     <Box className="sub">JUN 26</Box>
//                 </Box>
//             </Box>

//             {/* SVG ring */}
//             <svg
//                 className="progress-ring"
//                 width={size}
//                 height={size}
//                 viewBox={`0 0 ${size} ${size}`}
//             >
//                 <defs>
//                     <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
//                         <stop offset="0%" stopColor="#9b6bff" />
//                         <stop offset="50%" stopColor="#ff6b9f" />
//                         <stop offset="100%" stopColor="#ffb86b" />
//                     </linearGradient>
//                     <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
//                         <stop offset="0%" stopColor="#ffd6f0" stopOpacity="0.6" />
//                         <stop offset="100%" stopColor="#f2f0ff" stopOpacity="0.4" />
//                     </linearGradient>
//                 </defs>

//                 {/* background ring */}
//                 {/* <circle
//             className="ring-bg"
//             cx={size / 2}
//             cy={size / 2}
//             r={radius}
//             stroke="url(#grad2)"
//             strokeWidth={stroke}
//             fill="none"
//           /> */}

//                 {/* progress ring */}
//                 <circle
//                     className="ring"
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     stroke="url(#grad)"
//                     strokeWidth={stroke}
//                     strokeLinecap="round"
//                     fill="none"
//                     strokeDasharray={`${circumference} ${circumference}`}
//                     strokeDashoffset={offset}
//                     style={{ transition: "stroke-dashoffset 900ms ease-out" }}
//                     transform={`rotate(-90 ${size / 2} ${size / 2})`}
//                 />
//             </svg>

//             {/* <Box className="tag">
//           <Box className="tag-inner">
//             <Box className="days-label">DAYS</Box>
//             <Box className="days-num">{time.days}</Box>
//             <Box className="small-time">
//               <span>{time.hours}</span>
//               <span>HRS</span>
//               <span>{time.minutes}</span>
//               <span>MINS</span>
//             </Box>
//           </Box>
//         </Box> */}
//         </Box>
//     );
// }

// export default BirthdayProgress;

import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

const deadline = "2025-09-22T23:59:59";

export default function BirthdayCounter({ className = "" }) {
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        const targetTime = new Date(deadline).getTime();

        if (isNaN(targetTime)) {
            console.error("Invalid deadline provided to BirthdayCounter");
            return;
        }

        const update = () => {
            const ms = Math.max(targetTime - Date.now(), 0);
            setRemaining(ms);
        };

        update(); // run immediately
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [deadline]);

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return (
        <>
            <Stack direction={"row"} gap={"2.5rem"}>
                <Stack
                    direction="column"
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Typography
                        sx={{
                            fontSize: "5.5rem",
                            m: 0,
                            height: "110px !important",
                            fontWeight: "700", // bold
                            transform: "scaleY(2) scaleX(1.2)",
                            lineHeight: 1,
                            letterSpacing: "0.1em",
                            color: "#d1d0cd"
                        }}
                    >
                        {String(days).padStart(2, "0")}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#d1d0cd" }}>
                        Days
                    </Typography>
                </Stack>

                <Stack
                    direction="column"
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Typography
                        sx={{
                            fontSize: "5.5rem",
                            m: 0,
                            height: "110px !important",
                            fontWeight: "700", // bold
                            m: 0,
                            transform: "scaleY(2) scaleX(1.2)",
                            lineHeight: 1,
                            letterSpacing: "0.1em",
                            color: "#d1d0cd"
                        }}
                    >
                        {String(hours).padStart(2, "0")}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#d1d0cd" }}>
                        {"Hours"}
                    </Typography>
                </Stack>

                <Stack
                    direction="column"
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Typography
                        sx={{
                            fontSize: "5.5rem",
                            m: 0,
                            height: "110px !important",
                            fontWeight: "700", // bold
                            m: 0,
                            transform: "scaleY(2) scaleX(1.2)",
                            lineHeight: 1,
                            letterSpacing: "0.1em",
                            color: "#d1d0cd"
                        }}
                    >
                        {String(minutes).padStart(2, "0")}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#d1d0cd" }}>
                        {"Minutes"}
                    </Typography>
                </Stack>

                <Stack
                    direction="column"
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Typography
                        sx={{
                            fontSize: "5.5rem",
                            m: 0,
                            height: "110px !important",
                            fontWeight: "700", // bold
                            m: 0,
                            transform: "scaleY(2) scaleX(1.2)",
                            lineHeight: 1,
                            letterSpacing: "0.1em",
                            color: "#d1d0cd"
                        }}
                    >
                        {String(seconds).padStart(2, "0")}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#d1d0cd" }}>
                        {"Seconds"}
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
}
