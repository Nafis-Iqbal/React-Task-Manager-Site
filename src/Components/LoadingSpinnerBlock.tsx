import React from "react";
import { motion } from "framer-motion";

const LoadingSpinnerBlock: React.FC<{isOpen: boolean, customStyle?: string}> = ({customStyle = "", isOpen}) => {
    if(!isOpen) return null;
  return (
    <div className={`mt-2 mb-2 ${customStyle}`}>
      {/* Rotating Circular Orb */}
      <motion.div
        className="w-full h-full aspect-square mx-auto border-4 border-t-transparent border-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinnerBlock;
