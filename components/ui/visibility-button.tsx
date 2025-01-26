import React from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

type Props = {
  className?: string;
  iconClassName?: string;
  showSecret: boolean;
  setShowSecret: (showSecret: boolean) => void;
};

const VisibilityButton = ({
  showSecret,
  setShowSecret,
  className,
  iconClassName,
}: Props) => {
  const iconStyle = `h-4 w-4 text-gray-400 hover:text-gray-500 ${iconClassName}`;

  return (
    <button
      type="button"
      className={className}
      onClick={() => setShowSecret(!showSecret)}
    >
      {showSecret ? (
        <FiEyeOff className={iconStyle} />
      ) : (
        <FiEye className={iconStyle} />
      )}
    </button>
  );
};

export default VisibilityButton;
