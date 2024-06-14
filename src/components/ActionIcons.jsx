import {CheckOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import styles from "../views/Personalnformation/PersonalInformation.module.css";

export const Steps = {
  UPLOAD: 'upload',
  SAVE: 'save'
};

const ActionIcons = ({step, onEdit, onCheck, onCancel, className }) => {
  return (
    <>
      {step === Steps.UPLOAD && (
        <EditOutlined
          onClick={onEdit}
          className={className ?? styles.editCoverIcon}
        />
      )}
      {step === Steps.SAVE && (
        <div className={`${className ?? styles.editCoverIcon} d-flex justify-content-between gap-2`}>
          <CheckOutlined className={styles.hoverBorderBottom} onClick={onCheck} />
          <CloseOutlined className={styles.hoverBorderBottom} onClick={onCancel} />
        </div>
      )}
    </>
  )
};


export default ActionIcons;