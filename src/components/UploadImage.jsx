import CoverImage from "../views/Personalnformation/CoverImage";
import {CheckOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import styles from "../views/Personalnformation/PersonalInformation.module.css";
import {useRef, useState} from "react";
import {toImageUrl} from "../tasks/toImageUrl";

const Steps = {
  UPLOAD: 'upload',
  SAVE: 'save'
};

const UploadImage = ({ image, onSave }) => {
  const [photo, setPhoto] = useState(image ? toImageUrl(image) : undefined);
  const inputEditFile = useRef();
  const [step, setStep] = useState(Steps.UPLOAD);
  const [file, setFile] = useState();

  const onInputSelect = () => {
    inputEditFile.current.click();
  }

  const onFileUpload = (e) => {
    if (!e.target.files) { return }
    setPhoto(URL.createObjectURL(e.target.files[0]))
    setStep(Steps.SAVE);
    setFile(e.target.files[0]);
  }

  const cancelUpload = () => {
    setPhoto(image);
    setStep(Steps.UPLOAD);
  }

  const saveUpload = () => {
    onSave(file);
    setStep(Steps.UPLOAD);
  }

  return (
    <div className={'position-relative'}>
      <CoverImage
        src={photo}
      />
      {step === Steps.UPLOAD && (
        <EditOutlined
          onClick={onInputSelect}
          className={styles.editCoverIcon}
        />
      )}
      {step === Steps.SAVE && (
        <div className={`${styles.editCoverIcon} d-flex justify-content-between gap-2`}>
          <CheckOutlined className={styles.hoverBorderBottom} onClick={saveUpload} />
          <CloseOutlined className={styles.hoverBorderBottom} onClick={cancelUpload} />
        </div>
      )}
      <input
        type="file"
        className={'invisible'}
        multiple={false}
        accept={'image/*'}
        ref={inputEditFile}
        onChange={onFileUpload}
      />
    </div>
  );
};

export default UploadImage;