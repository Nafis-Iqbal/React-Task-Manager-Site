import { motion } from "framer-motion";
import React from "react";

type LoadingModalProps = {
  isOpen: boolean;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50">
      {/* Prevents interaction with background elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4"
      >
        {/* Loading Animation */}
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        />

        {/* Loading Text */}
        <p className="text-lg font-semibold">Loading...</p>
        <p className="text-gray-600">Plz wait</p>
      </motion.div>
    </div>
  );
};

export default LoadingModal;
