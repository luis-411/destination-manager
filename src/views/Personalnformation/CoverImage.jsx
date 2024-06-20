import styles from "./PersonalInformation.module.css";


const CoverImage = ({ src, height = 'initial' }) => {
  return (
    <div className='position-relative w-100 p-0' style={{ height }}>
      <img
        src={src ?? require('../../images/add-image.jpg')}
        alt='cover default background'
        className={styles.coverImage}
      />
      <div className={styles.coverImageShadow}/>
    </div>
  );
};

export default CoverImage;