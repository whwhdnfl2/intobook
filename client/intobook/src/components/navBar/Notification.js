import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export const Notification = () => (
    <motion.div
        whileHover={{ scale: 1.2}}
        whileTap={{ scale: 0.8 }}
        style={{
            fontSize: "20px",
        }}
    >
        <FontAwesomeIcon icon={faBell} style={{ color: "var(--main-point-color)" }}/>
    </motion.div>
);
