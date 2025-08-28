import React from 'react';
import { X } from "lucide-react"; 

type PhotoModalProps = {
  images: string[]; // Array of image URLs
  onClose: () => void; // Function to close the modal
};

const PhotoDisplayModal: React.FC<PhotoModalProps> = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Task Images</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        {/* Scrollable Image List */}
        <div className="space-y-4 max-h-60 overflow-y-auto">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Task Image ${index + 1}`} className="w-full rounded-lg shadow-md" />
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PhotoDisplayModal;
