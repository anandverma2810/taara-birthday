import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function CuteTitle() {
    const [showType, setShowType] = useState(true);
    const [index, setIndex] = useState(0);

    const fadeMessages = [
        "prepares for her grand rebirth ✨",
        "Reincarnation loading… please wait ⏳",
        "The universe is getting ready \n for your return 🌌",
        "A new age of cuteness begins soon 👑",
        "The Goddess will descend in… ⛅️",
        "Birthdays? More like divine \n rebirth days 💫",
        "Reincarnation of beauty in progress 🌸",
        "Even gods need cake sometimes 🍰",
        "Brace yourself… a higher form \n of you is about to appear 🦋",
        "Heaven’s most beautiful soul \n comes back on her day 🌙"
    ];

    useEffect(() => {
        if (!showType) {
            const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % fadeMessages.length);
            }, 4000); // 3 seconds per message
            return () => clearInterval(interval);
        }
    }, [showType]);

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            {showType ? (
                <TypeAnimation
                    sequence={[
                        "The Human",
                        3000,
                        "The Goddess",
                        2000,
                        "",
                        500,
                        () => setShowType(false), // after erase, switch to fade messages
                    ]}
                    wrapper="h2"
                    cursor={true}
                    repeat={0}
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#d1d0cd"
                    }}
                />
            ) : (
                <h2
                    key={index} // ensures re-animation
                    style={{
                        fontSize: "1.6rem",
                        fontWeight: "bold",
                        opacity: 0,
                        color: "#d1d0cd",
                        animation: "fadeInOut 5s ease-in-out",
                    }}
                >
                    {fadeMessages[index]}
                </h2>
            )}

            <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
        </div>
    );
}
