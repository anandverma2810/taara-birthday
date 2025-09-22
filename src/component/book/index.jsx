import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { POEMS_FOR_HER } from "../../utils/constants";
import m1 from "../../assets/videos/m1.mov";
import m2 from "../../assets/videos/m2.mp4";
import m3 from "../../assets/videos/m3.mp4";
import book from "../../assets/images/book.png";
import casates from "../../assets/videos/casate.mp4";
import ao from "../../assets/audio/ao1.m4a";
import ao2 from "../../assets/audio/ao2.m4a";
import bg from "../../assets/audio/bg.mp3";
import music from "../../assets/audio/music.mp3";



const Book = ({ songRef }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [backPageDone, setBackPageDone] = useState(false);
    const audioRef1 = useRef(null);
    const audioRef2 = useRef(null);
    const bgRef = useRef(null);
    const musicRef = useRef(null);




    const m1Ref = useRef(null);
    const m2Ref = useRef(null);
    const m3Ref = useRef(null);
    const casateRef = useRef(null);

    const typingComp = () => (
        <>
            <audio ref={audioRef2} src={ao2} preload="auto" />
            <audio ref={bgRef} src={bg} preload="auto" />

            <TypeAnimation
                sequence={[POEMS_FOR_HER.birthday, 2000, () => setBackPageDone(true)]}
                speed={185}
                style={{
                    display: "block",
                    whiteSpace: "pre-wrap",
                    marginTop: "2rem",
                    color: "black",
                }}
                cursor={true}
                repeat={0}
            />
        </>
    )
    const pages = {
        0: <Box component={"img"} src={book} sx={{
            width: "25rem",
            height: "33rem",
        }} />,
        2: (
            currentPage === 2 && backPageDone ? <TypeAnimation
                sequence={[POEMS_FOR_HER.birthday1, 2000]}
                speed={185}
                style={{
                    display: "block",
                    whiteSpace: "pre-wrap",
                    marginTop: "2rem",
                    color: "black",
                }}
                cursor={true}
            /> : null
        ),
        1: (
            <>
                <audio ref={audioRef1} src={ao} preload="auto" />
                <audio ref={musicRef} src={music} preload="auto" loop/>

                <video
                    ref={casateRef}
                    width="100%"
                    height="100%"
                    loop
                    style={{ objectFit: "cover" }}
                >
                    <source src={casates} type="video/mp4" />
                </video>
            </>

        ),
        3: (
            <video
                ref={m1Ref}
                width="100%"
                height="100%"
                // controls
                style={{ objectFit: "cover" }}
            >
                <source src={m3} type="video/mp4" />
            </video>
        ),
        4: (
            <video
                ref={m2Ref}
                width="100%"
                height="100%"
                // controls
                style={{ objectFit: "cover" }}
            >
                <source src={m2} type="video/mp4" />
            </video>
        ),
        5: (
            <video
                ref={m3Ref}
                width="100%"
                height="100%"
                // controls
                style={{ objectFit: "cover" }}
            >
                <source src={m1} type="video/mp4" />
            </video>
        ),
    };

    const totalPages = Object.keys(pages).length;

    const nextPage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            songRef.current.volume = 0.1;
            setCurrentPage(0);
            setBackPageDone(false);
        }
    };

    const prevPage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentPage === 1) {
            songRef.current.volume = 0.1;
        }
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            audioRef1.current.pause();
            audioRef1.current.currentTime = 0;
            bgRef.current.pause();
            bgRef.current.currentTime = 0;
        };
    };

    useEffect(() => {

        if (currentPage === 0) {
            [m1Ref, m2Ref, m3Ref].forEach((ref) => {
                if (ref.current) ref.current.pause();
            });
        }
        [m1Ref, m2Ref, m3Ref].forEach((ref) => {
            if (ref.current) ref.current.pause();
        });

        if (currentPage === 2 && audioRef2.current) {
            bgRef.current.volume = 0.04;
            bgRef.current.play();

            setTimeout(() => {
                audioRef2.current.play();
                audioRef2.current.volume = 1;
            }, 10000);

            audioRef1.current.currentTime = 0;
            audioRef1.current.pause();
            musicRef.current.pause();

            m2Ref.current.pause();
            m2Ref.current.currentTime = 0;

            m3Ref.current.pause();
            m3Ref.current.currentTime = 0;

            m1Ref.current.pause();
            m1Ref.current.currentTime = 0;
        }

        if (currentPage === 1 && casateRef.current) {
            songRef.current.volume = 0.01;

            casateRef.current.play();
            audioRef1.current.volume = 1;
            audioRef1.current.play();

            musicRef.current.volume = 0.05;
            musicRef.current.play();

            m2Ref.current.pause();
            m2Ref.current.currentTime = 0;

            m3Ref.current.pause();
            m3Ref.current.currentTime = 0;

            m1Ref.current.pause();
            m1Ref.current.currentTime = 0;
        };

        if (currentPage === 3 && m1Ref.current) {
            m1Ref.current.play();
            m2Ref.current.pause();
            musicRef.current.pause();

            m2Ref.current.currentTime = 0;

            m3Ref.current.pause();
            m3Ref.current.currentTime = 0;

            casateRef.current.pause();
            casateRef.current.currentTime = 0;

            audioRef1.current.pause();
            audioRef1.current.currentTime = 0;
        };
        if (currentPage === 4 && m2Ref.current) {
            m2Ref.current.play();
            m1Ref.current.pause();
            m1Ref.current.currentTime = 0;
            musicRef.current.pause();

            m3Ref.current.pause();
            m3Ref.current.currentTime = 0;

            casateRef.current.pause();
            casateRef.current.currentTime = 0;

            audioRef1.current.pause();
            audioRef1.current.currentTime = 0;
        };
        if (currentPage === 5 && m3Ref.current) {
            m3Ref.current.play();
            m2Ref.current.pause();
            m2Ref.current.currentTime = 0;
            musicRef.current.pause();

            m1Ref.current.pause();
            m1Ref.current.currentTime = 0;

            casateRef.current.pause();
            casateRef.current.currentTime = 0;

            audioRef1.current.pause();
            audioRef1.current.currentTime = 0;
        };
    }, [currentPage]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Box
                sx={{
                    width: "25rem",
                    height: "33rem",
                    perspective: 1500,
                    position: "relative",
                }}
            >
                {Object.keys(pages)?.map((_, index) => {
                    const content = pages[index];
                    const isFlipped = index < currentPage;

                    return (
                        <Box
                            key={index}
                            sx={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                right: 0,
                                transformStyle: "preserve-3d",
                                transformOrigin: "left",
                                zIndex: totalPages - index,
                                transition: "transform 0.6s ease-in-out",
                                transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: isFlipped
                                        ? "rotateY(-180deg)"
                                        : "rotateY(-5deg)",
                                },
                            }}
                        >
                            {/* Front of page */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    bgcolor: "#fff8e1",
                                    border: "1px solid #ccc",
                                    boxShadow: 3,
                                    fontSize: "0.8rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    backfaceVisibility: "hidden",
                                }}
                                onClick={nextPage}
                            >
                                {content}
                            </Box>

                            {/* Back of page */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    bgcolor: "#fff8e1",
                                    border: "1px solid #ccc",
                                    fontSize: "0.8rem",
                                    boxShadow: 3,
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                    backfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)",
                                }}

                                onClick={prevPage}
                            >
                                {currentPage === 2 && typingComp()}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Book;

