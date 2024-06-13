import {create} from "zustand";
import {Modal} from "react-bootstrap";
import styles from "../views/Personalnformation/PersonalInformation.module.css";
import {CloseOutlined} from "@ant-design/icons";


export const useAppModal = create((set) => ({
  isOpen: false,
  widthClassName: 'modal-50w',
  setIsOpen: (isOpen) => set({ isOpen }),
  setWidthClassName: (widthClassName) => {set({widthClassName})},
  labelBy: 'app-modal',
  header: '',
  component: null,
  setComponent: (component) => set({ component }),
  reset: () => {
    set({ component: null });
    set( { labelBy: 'app-modal' } );
    set({ isOpen: false });
  }
}));

const AppModal = () => {
  const {
    isOpen,
    setIsOpen,
    labelBy,
    component,
    reset,
    widthClassName
  } = useAppModal();

  return (
    <Modal
      show={isOpen}
      onHide={() => setIsOpen(false)}
      dialogClassName={widthClassName}
      aria-labelledby={labelBy}
      contentClassName={styles.modalBody}
      centered
    >
      <Modal.Body className='d-flex flex-column justify-content-between pb-5'>
        <div className={'d-flex justify-content-end w-100'}>
          <button className={'btn text-white py-0'} onClick={reset}>
            <CloseOutlined />
          </button>
        </div>
        { component }
        {/*{ <CreateNewVisit /> }*/}
      </Modal.Body>
    </Modal>
  );
};

export default AppModal;