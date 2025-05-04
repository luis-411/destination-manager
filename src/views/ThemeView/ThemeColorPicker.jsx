import { useThemeModal } from "../ThemeView/ThemePopup";
import {useGetColor, useThemeColor} from "../../tasks/getColor";
const ThemeColorPicker = () => {
  const { setIsOpen } = useThemeModal();
  const [themeColor, setThemeColor] = useThemeColor();
  
  const getColor = useGetColor();
  const handleThemeColorChange = (sender) => {
    const color = sender.target.style.backgroundColor;
    setThemeColor("#fff");
    getColor(100)
    setIsOpen(false);
  }
  return (
    <div>
      <h4 className='fs-6 fw-bold fw-normal'>Theme Color Picker</h4>
      <h4 className='fs-6 fw-normal'>Choose your theme color:</h4>
      <div className="d-flex flex-row gap-2">
        <button className="btn rounded" onClick={handleThemeColorChange} style={{backgroundColor: "#200000", height: 50, width: 50}}></button>
        <button className="btn rounded" onClick={handleThemeColorChange} style={{backgroundColor: "#1a1a1a", height: 50, width: 50}}></button>
      </div>
    </div>
  );
};

export default ThemeColorPicker;