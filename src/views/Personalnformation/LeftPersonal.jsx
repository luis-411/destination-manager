import {Row} from "react-bootstrap";
import styles from "./PersonalInformation.module.css";
import AvatarIcon from "./AvatarIcon";
import {capitalize} from "lodash";
import VisitedHistory from "./VisitedHistory";
import CoverImage from "./CoverImage";

const LeftPersonal = ({ personalInfo }) => {
  if (!personalInfo) {
    return null;
  }
  const initials = personalInfo.username.slice(0, 2).toUpperCase();

  return (
    <div className='p-3'>
      <Row className='position-relative mb-4'>
        <CoverImage />
        <div className={styles.avatarWrapper}>
          <AvatarIcon
            size={56}
            image={personalInfo.profilePhoto}
            label={initials}
          />
        </div>
      </Row>
      <Row className='pt-2'>
        <h4 className='fs-6 fw-bold'>{capitalize(personalInfo.username)}</h4>
        <h5 className='fs-6 fw-light'>{capitalize(personalInfo.occupation ?? 'No occupation')}</h5>
      </Row>
      <Row className='pt-2'>
        <h4 className='fs-6 fw-bold fw-normal'>Personal Information</h4>
        <Row>
          <h6 className={`${styles.fs7} col-3 fw-normal`}>Email</h6>
          <h6 className={`${styles.fs7} col-5 fw-bold`}>{personalInfo.email}</h6>
        </Row>
        <Row>
          <h6 className={`${styles.fs7} col-3 fw-normal`}>Joined At</h6>
          <h6 className={`${styles.fs7} col-5 fw-bold`}>{new Date(personalInfo.createdAt).toLocaleDateString()}</h6>
        </Row>
      </Row>
      <div className='mt-4'>
        <VisitedHistory userId={personalInfo.id} />
      </div>
    </div>
  );
};

export default LeftPersonal;