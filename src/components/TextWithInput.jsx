import {Form} from "react-bootstrap";
import React, {useState} from "react";
import ActionIcons, {Steps} from "./ActionIcons";
import styles from "./TextWithInput.module.css";


const TextWithInput = ({ text, defaultText, onSave, createNewGroup , setCreateNewGroup }) => {
  const [state, setState] = useState(createNewGroup ? Steps.SAVE :Steps.UPLOAD);
  const [currentText, setCurrentText] = useState(text ?? '');

  const onCheck = () => {
    onSave(currentText);
    setState(Steps.UPLOAD);
  }

  return (
    <div className='position-relative'>
      {state === Steps.UPLOAD &&
        (
          <h5 className='fs-6 fw-light mt-1'>
            {currentText ?? defaultText}
          </h5>
        )}
      {state === Steps.SAVE &&
        (
          <Form.Control
            className={`${styles.input}`}
            value={currentText}
            placeholder={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
        )}
      <ActionIcons
        step={state}
        className={styles.actionStates}
        onEdit={() => setState(Steps.SAVE)}
        onCancel={() => createNewGroup ? setCreateNewGroup(false):setState(Steps.UPLOAD)}
        onCheck={onCheck}
      />
    </div>
  );
};

export default TextWithInput;