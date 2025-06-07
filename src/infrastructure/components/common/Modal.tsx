// Modal.tsx
import { X } from 'lucide-react';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  body?: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, body = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      {
        body
          ? <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg relative w-4xl flex justify-center items-center">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-lg"><X /></button>
            {children}
          </div>
          : <div className="">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-lg"><X /></button>
            {children}
          </div>
      }

    </div>
  );
};

export default Modal;
