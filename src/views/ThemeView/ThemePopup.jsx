import {Modal} from "react-bootstrap";
import {create} from "zustand";
import styles from "./PersonalInformation.module.css";
import ThemeColorPicker from "./ThemeColorPicker";
export const useThemeModal = create((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

const ThemePopup = () => {
    const {isOpen, setIsOpen} = useThemeModal();
    return (
        <Modal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        dialogClassName='modal-90w'
        aria-labelledby='personal-information'
        contentClassName={styles.modalBody}
        centered
        backdropClassName={styles.modal}
        className={styles.modalWrapper}
      >
        <Modal.Body className='d-flex justify-content-between'>
          <div>
          <ThemeColorPicker />
            
          </div>
        </Modal.Body>
      </Modal>
    );
};

export default ThemePopup;