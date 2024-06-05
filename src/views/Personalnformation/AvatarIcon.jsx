import styles from "./PersonalInformation.module.css";


const AvatarIcon = ({size, image, label}) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
      className={styles.avatarIcon}
    >
      {image && <img src={image} alt="avatar"/>}
      {label && <span style={{ fontSize: `${size / 3}px` }}>{label}</span>}
    </div>
  )
};

export default AvatarIcon;