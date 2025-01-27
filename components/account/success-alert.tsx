import AlertContainer from "../ui/alert-container";

interface AlertProps {
  onClose: () => void;
}

const SuccessAlert: React.FC<AlertProps> = ({ onClose }) => {
  return (
    <AlertContainer onClose={onClose}>
      <p>Sukses</p>
    </AlertContainer>
  );
};

export default SuccessAlert;
