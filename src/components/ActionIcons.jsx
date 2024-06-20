import { EditOutlined } from "@ant-design/icons";
import styles from "../views/Personalnformation/PersonalInformation.module.css";
import EditBar from "./EditBar";
export const Steps = {
  UPLOAD: 'upload',
  SAVE: 'save'
};

const ActionIcons = ({ step, onEdit, onCheck, onCancel, className }) => {
  return (
    <>
      {step === Steps.UPLOAD && (
        <EditOutlined
          onClick={onEdit}
          className={className ?? styles.editCoverIcon}
        />
      )}
      {step === Steps.SAVE && (
        <EditBar
          onCancel={onCancel}
          onCheck={onCheck}
          className={className} />
      )}
    </>
  )
};


export default ActionIcons;