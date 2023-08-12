import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";

export const Question = () => (
    <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        style={{
            fontSize: "22px",
        }}
    >
        <FontAwesomeIcon icon={faClipboardQuestion} />
    </motion.div>
);
