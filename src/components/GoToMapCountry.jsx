import {GlobalOutlined} from "@ant-design/icons";
import {useReferencedCountry} from "../views/MapView/Map";
import {usePersonalInfoModal} from "../views/Personalnformation/PersonalInformation";

const GoToMapCountryButton = ({regionId, showText = true, text}) => {
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
      {showText && <span style={{ fontSize: '0.8rem' }}>{ text ?? 'Show on map' }</span>}
    </button>
  );
};

export default GoToMapCountryButton