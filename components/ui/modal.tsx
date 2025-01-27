import { MouseEvent, ReactNode } from "react";

interface Props {
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<Props> = ({ onClose, children, className }) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg min-w-64  flex flex-col items-center justify-center ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
