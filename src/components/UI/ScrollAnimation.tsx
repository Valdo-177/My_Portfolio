import { useRef } from "react";
import { motion } from "framer-motion";

interface IScrollAnimation {
  children: React.ReactElement;
  direction?: "left" | "right" | "top" | "bottom";
}

const ScrollAnimation = ({ children, direction = "bottom" }: IScrollAnimation) => {
  const ref = useRef(null);

  let initial = {};
  switch (direction) {
    case "bottom":
      initial = { y: 50, opacity: 0 };
      break;
    case "top":
      initial = { y: -50, opacity: 0 };
      break;
    case "left":
      initial = { x: -50, opacity: 0 };
      break;
    case "right":
      initial = { x: 50, opacity: 0 };
      break;
    default:
      initial = { opacity: 0 };
      break;
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
