import styles from "./PersonalInformation.module.css";
import {Modal} from "react-bootstrap";
import {create} from "zustand";
import LeftPersonal from "./LeftPersonal";

export const usePersonalInfoModal = create((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

const PersonalInformation = () => {
  const {isOpen, setIsOpen} = usePersonalInfoModal();

  return (
    <Modal
      show={true}
      onHide={() => setIsOpen(false)}
      dialogClassName='modal-90w'
      aria-labelledby='personal-information'
      contentClassName={styles.modalBody}
      centered
    >
      <Modal.Body className='d-flex'>
        <div className={styles.basisFlex}>
          <LeftPersonal />
        </div>
        <div className={styles.basisFlex}>
        </div>
      </Modal.Body>
    </Modal>
  );
};


export default PersonalInformation;