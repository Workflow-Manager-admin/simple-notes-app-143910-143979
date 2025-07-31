import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: string;
}

// PUBLIC_INTERFACE
export default function Modal({
  open,
  onClose,
  children,
  title,
  width = "max-w-md",
}: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed z-40 inset-0 flex items-center justify-center bg-black/30"
      style={{ backdropFilter: "blur(2px)" }}
      onClick={onClose}
      data-testid="modal-backdrop"
    >
      <div
        className={`bg-white rounded-lg p-8 shadow-lg relative w-full ${width}`}
        onClick={e => e.stopPropagation()}
        style={{ minWidth: 300, maxWidth: 560 }}
      >
        <button
          className="absolute right-4 top-2 text-gray-400 hover:text-black text-lg"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
