import CoverImage from "../views/Personalnformation/CoverImage";
import {useRef, useState} from "react";
import {toImageUrl} from "../tasks/toImageUrl";
import ActionIcons, {Steps} from "./ActionIcons";

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
    setPhoto(image ? toImageUrl(image) : undefined);
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
      <ActionIcons
        step={step}
        onEdit={onInputSelect}
        onCheck={saveUpload}
        onCancel={cancelUpload}
      />
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