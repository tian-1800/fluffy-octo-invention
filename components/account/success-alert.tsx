import Modal from "../ui/modal";

interface AlertProps {
  onClose: () => void;
}

const SuccessAlert: React.FC<AlertProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <p>Sukses</p>
    </Modal>
  );
};

export default SuccessAlert;
