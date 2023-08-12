import { motion } from "framer-motion";

export const LogoAnimation = () => (
    <>
        <motion.div
            style={{
                width: "120px",
                height: "120px",
                backgroundColor: "var(--white)",
                marginRight: "auto",
                marginLeft: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "70px",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                color: "var(--main-color)",
                boxShadow: "8px 10px 6px rgba(0, 0, 0, 0.2)"
            }}
            animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
                duration: 1.5, // 애니메이션 지속 시간 (초)
            }}
        >
            B
        </motion.div>
    </>
);
