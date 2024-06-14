import styles from "./PersonalInformation.module.css";
import {Modal} from "react-bootstrap";
import {create} from "zustand";
import LeftPersonal from "./LeftPersonal";
import RightPersonal from "./RightPersonal";
import useLoadMe from "../../api/useLoadMe";

export const usePersonalInfoModal = create((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

const PersonalInformation = () => {
  const {isOpen, setIsOpen} = usePersonalInfoModal();
  const [{data: personalInfo, loading}] = useLoadMe();
  if (loading) {
    return null;
  }

  return (
    <Modal
      show={isOpen}
      onHide={() => setIsOpen(false)}
      dialogClassName='modal-90w'
      aria-labelledby='personal-information'
      contentClassName={styles.modalBody}
      centered
    >
      <Modal.Body className='d-flex justify-content-between'>
        <div className={styles.basisFlex}>
          <LeftPersonal personalInfo={personalInfo} />
        </div>
        <div className={styles.basisFlex}>
          <RightPersonal />
        </div>
      </Modal.Body>
    </Modal>
  );
};


export default PersonalInformation;