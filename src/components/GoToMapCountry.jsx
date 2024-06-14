import {GlobalOutlined} from "@ant-design/icons";
import {useReferencedCountry} from "../views/MapView/Map";
import {usePersonalInfoModal} from "../views/Personalnformation/PersonalInformation";

const GoToMapCountryButton = ({regionId}) => {
  const {
    setCountry: setReferencedCountry
  } = useReferencedCountry();
  const { setIsOpen } = usePersonalInfoModal();

  const goToMap = () => {
    if (!regionId) return
    setReferencedCountry(regionId);
    setIsOpen(false);
  }

  return (
    <button className={'btn d-flex align-items-center gap-2 text-white'} onClick={goToMap}>
      <GlobalOutlined/>
      <span className='fa-xs'>Show on map</span>
    </button>
  );
};

export default GoToMapCountryButton