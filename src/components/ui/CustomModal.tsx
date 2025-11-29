// components/ui/CustomModal.tsx
'use client';

import { ReactNode } from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function CustomModal({ isOpen, onClose, title, children }: CustomModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose} // закрытие по клику на фон
    >
      <div
        className="bg-gradient-to-br from-gray-800 via-blue-900 to-purple-900 text-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors text-sm"
        >
          ✕
        </button>

        {title && (
          <h2 className="text-2xl font-bold mb-4">
            {title}
          </h2>
        )}

        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
