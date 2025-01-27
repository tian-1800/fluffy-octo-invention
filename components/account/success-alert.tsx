import { FaCheck } from "react-icons/fa6";
import Modal from "../ui/modal";

interface AlertProps {
  onClose: () => void;
}

const SuccessAlert: React.FC<AlertProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white`}
      >
        <FaCheck className="w-6 h-6" />
      </div>
      <p className="text-sm mt-6">Update profil berhasil</p>
      <button
        className="mt-1 text-red-500 font-semibold"
        type="button"
        onClick={onClose}
      >
        Tutup
      </button>
    </Modal>
  );
};

export default SuccessAlert;
