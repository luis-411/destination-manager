import Dropdown from "react-bootstrap/Dropdown";

const AppDropdown = ({ value, placeholder, options }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {  value ?? placeholder }
      </Dropdown.Toggle>

      <Dropdown.Menu>
        { options.map((option, idx) => {
          const isSelected = value === option.value ? 'dropdown-item-selected' : '';
          return (
            <Dropdown.Item
              key={idx}
              as="button"
              onClick={option.onClick}
              className={isSelected}
            >
              {option.value}
            </Dropdown.Item>
        )})}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppDropdown;