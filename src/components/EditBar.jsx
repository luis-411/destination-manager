import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import styles from "../views/Personalnformation/PersonalInformation.module.css";

const EditBar = ({onCheck, onCancel, className}) => {
    return (
    <div className={`${className ?? styles.editCoverIcon} d-flex justify-content-between gap-2`}>
        <CheckOutlined className={styles.hoverBorderBottom} onClick={onCheck} />
        <CloseOutlined className={styles.hoverBorderBottom} onClick={onCancel} />
    </div>);
}


export default EditBar