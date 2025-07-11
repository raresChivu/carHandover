import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto relative animate-fade-in">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="sticky top-0 right-0 float-right text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none z-10 bg-white rounded p-1"
            aria-label="Close modal"
          >
            &times;
          </button>
        )}
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-center text-black clear-both">
            {title}
          </h2>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
