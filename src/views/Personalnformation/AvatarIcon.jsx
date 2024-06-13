import styles from "./PersonalInformation.module.css";
import {useHover} from "usehooks-ts";
import {useRef, useState} from "react";
import ActionIcons, {Steps} from "../../components/ActionIcons";
import {toImageUrl} from "../../tasks/toImageUrl";


const AvatarIcon = ({size, image, label, onSave}) => {
  const ref = useRef(null);
  const hover = useHover(ref);
  const [step, setStep] = useState(Steps.UPLOAD);
  const [avatar, setAvatar] = useState(image ? toImageUrl(image) : undefined);
  const [file, setFile] = useState();

  const inputEditFile = useRef(null);
  const onInputSelect = () => {
    inputEditFile.current.click();
  }

  const onFileUpload = (e) => {
    if (!e.target.files) { return }
    setAvatar(URL.createObjectURL(e.target.files[0]))
    setStep(Steps.SAVE);
    setFile(e.target.files[0]);
  }

  const cancelUpload = () => {
    setAvatar(image ? toImageUrl(image) : undefined);
    setStep(Steps.UPLOAD);
  }

  const saveUpload = () => {
    onSave(file);
    setStep(Steps.UPLOAD);
  }


  return (
    <div
      ref={ref}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
      className={styles.avatarIcon}
    >
      {avatar && <img src={avatar} style={{ maxWidth:`${size}px` }} className={styles.avatarImg} alt="avatar"/>}
      {label && !avatar && <span style={{fontSize: `${size / 3}px`}}>{label}</span>}
      {hover && (
        <ActionIcons
          step={step}
          className={styles.avatarEditIcon}
          onEdit={onInputSelect}
          onCheck={saveUpload}
          onCancel={cancelUpload}
        />
      )}
      <input
        type="file"
        className={'invisible'}
        style={{ width: 0, height: 0 }}
        multiple={false}
        accept={'image/*'}
        ref={inputEditFile}
        onChange={onFileUpload}
      />
    </div>
  )
};

export default AvatarIcon;