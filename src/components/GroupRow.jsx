import useUpdateMeWithGroups from "../api/useUpdateMeWithGroups";
import useLoadMeWithGroups from "../api/useLoadMeWithGroups";
import {message} from "antd";
import styles from "../views/Personalnformation/RightPersonal.module.css";
import {Col, Form} from "react-bootstrap";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useState} from "react";
import textInputStyles from "./TextWithInput.module.css";
import {set} from "lodash";
import GoToMapCountryButton from "./GoToMapCountry";
import {useEffect, useRef} from "react";
import Select from "react-select";
import LoadCountriesTask from "../tasks/LoadCountriesTask";
import EmojiPicker from "emoji-picker-react"; // Import the emoji picker


const GroupRow = ({
  id,
  name,
  regions,
  onCreate,
  setCreateNewGroup,
  groups,
  setGroups,
  description,
  arrayPosition,
  inputRef,
  emoji
}) => {
  const { executePutGroups } = useUpdateMeWithGroups();
  const { fetch} = useLoadMeWithGroups();
  const [isEditMode, setIsEditMode] = useState(false);
  const [groupName, setGroupName] = useState(name ?? '');
  const [groupDescription, setGroupDescription] = useState(description ?? '');
  const [groupRegions, setGroupRegions] = useState(regions ?? []);
  const [fileRetrieved, setFileRetrieved] = useState([]);
  const [groupEmoji, setGroupEmoji] = useState(emoji ?? ''); // State to store the selected emoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker
  const emojiPickerRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setNewGroupEmoji(emojiObject.emoji); // Set the selected emoji
    //setGroupEmoji(emojiObject.emoji); // Store the selected emoji
    setShowEmojiPicker(false); // Close the emoji picker
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false); // Close the emoji picker
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  const onEditGroup = () => {
    setIsEditMode(true);
  }

  const onCancelSubmitEdit = () => {
    setGroupName(name);
    setGroupDescription(description ?? '');
    setGroupRegions(regions ?? []);
    setGroupEmoji(emoji ?? "");
    setIsEditMode(false);
  }

  const onSubmitEdit = () => {
    const newGroups = set(groups, arrayPosition, {
      ...groups[arrayPosition],
      name: groupName,
      description: groupDescription,
      regions: groupRegions,
      emoji: groupEmoji
    });

    executePutGroups({
      data: {
        groups: newGroups
      }
    }).then((response) => {
      if (response.status < 400) {
        message.success("Travel collection was successfully updated")
        setIsEditMode(false);
      } else {
        throw new Error('Failed to update the travel collection')
      }
    }).catch((error) => {
      message.error(error.message);
    })
  }

  const deleteGroup = () => {
    executePutGroups({
      data: {
        groups: groups.filter((group) => group.id !== id)
      }
    }).then((response) => {
      if (response.status < 400) {
        setGroups(groups.filter((group) => group.id !== id))
        message.success("Travel collection deleted successfully")
      } else {
        throw new Error('Failed to delete travel collection')
      }
    }).catch((error) => {
      message.error(error.message);
    })
  }

  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescriptipn] = useState('');
  const [newGroupRegions, setNewGroupRegions] = useState([]);
  const [newGroupEmoji, setNewGroupEmoji] = useState('');
  const onSave = () => {
    executePutGroups({
      data: {
        groups: [...groups, { name: newGroupName, description: newGroupDescription, regions: newGroupRegions.map(region => region.value), emoji: newGroupEmoji }]
      }
    })
      .then((response) => {
        if (response.status < 400) {
          return fetch().catch((error) => {
            throw new Error('Failed to fetch the travel collection');
          });
        } else {
          throw new Error(response.data.error.message || 'Failed to executePutGroups');
        }
      })
      .then(() => {
        setGroups([...groups, { name: newGroupName, description: newGroupDescription, regions: newGroupRegions.map(region => region.value), emoji: newGroupEmoji }]);
        setCreateNewGroup(false);
        message.success("Travel collection created successfully");

      })
      .catch((error) => {
        message.error(error.response?.data?.error?.message || error.message);
        setCreateNewGroup(true);
      });
  }
  const load = () => {
    const loadCountriesTask = new LoadCountriesTask();
    loadCountriesTask.load(setFileRetrieved);
  };
  const [availableRegions, setAvailableRegions] = useState([]);
  useEffect(load, []);
  useEffect(() => {
    const regionsData = fileRetrieved.map((region) => ({
               value: region,
               label: region.Region,
             }));
    setAvailableRegions(regionsData);
  }, [fileRetrieved]);

  // Fetch available regions when the component mounts
  // useEffect(() => {
  //   fetchAvailableRegions(); // Function to fetch regions
  // }, []);

  // const fetchAvailableRegions = async () => {
  //   try {
  //     const response = await fetchRegions(); // Replace with the actual API or store call
  //     if (response.status < 400) {
  //       const regionsData = response.data.map((region) => ({
  //         value: region.id,
  //         label: region.name,
  //       }));
  //       setAvailableRegions(regionsData);
  //     } else {
  //       throw new Error("Failed to fetch regions");
  //     }
  //   } catch (error) {
  //     message.error(error.message);
  //   }
  // };

  return (
    <>
      {!onCreate && (
        <div className={styles.elementRow}>
          <Col className='col-9 d-flex flex-column'>
            <div style={{display: "flex", alignItems: "center"}}>
              {!isEditMode && <h5 style={{display: "inline"}} className='fw-bold fs-6'>{groupName}</h5>}
              {isEditMode && (
                <Form.Control
                  className={`${textInputStyles.input} mt-1 mb-2`}
                  value={groupName}
                  style={{ borderColor: 'rgba(255, 255, 255, 0.7)' }}
                  placeholder={'Edit collection\'s name'}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              )}
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              {!isEditMode && <h5 style={{display: "inline", fontSize: '0.8rem'}}>{groupDescription || 'No description'}</h5>}
              {isEditMode && (
                <Form.Control
                  className={`${textInputStyles.input} mt-1 mb-2`}
                  value={groupDescription}
                  style={{ fontSize: '0.8rem', borderColor: 'rgba(255, 255, 255, 0.7)' }}
                  placeholder={'Edit collection\'s description'}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              )}
            </div>
            <div className={'d-flex'}>
              <h6 className={`fa-xs lh-1 m-0 fw-bold ${styles.groupRegions}`}>
                {regions?.length > 0 ? regions.map(region => (
                  <GoToMapCountryButton key={region.id} regionId={region.id} showText={true} text={region.Region} />
                )) : 'No regions yet'}
              </h6>
            </div>
            <div className={'d-flex'}>
              <h6 className={`fa-xs lh-1 m-0 fw-bold ${styles.groupRegions}`}>
                {groupEmoji && <span style={{ fontSize: '1.5rem' }}>{groupEmoji}</span>}
                {groupEmoji === "" && <span style={{ fontSize: '1.5rem' }}>😀</span>}
                </h6>
            </div>
          </Col>
          <Col className={'d-flex justify-content-end cursor align-items-center'}>
            {!isEditMode && (
              <button onClick={onEditGroup} className="btn text-white">
                <EditOutlined/>
              </button>
            )}
            {isEditMode && (
              <button onClick={onSubmitEdit} className="btn text-white">
                <CheckOutlined/>
              </button>
            )}
            {!isEditMode && (
              <button onClick={deleteGroup} className="btn text-white">
                {<DeleteOutlined/>}
              </button>
            )}
            {isEditMode && (
              <button onClick={onCancelSubmitEdit} className="btn text-white">
                {<CloseOutlined />}
              </button>
            )}
          </Col>
        </div>
      )}
      {onCreate &&
        <div style={{position: "relative", display: "block"}} className={styles.elementRow}  ref={inputRef}>
          <div className={'d-flex w-100 align-items-center gap-3 mb-2'}>
            <h6 style={{fontSize: '0.8rem'}} className='fw-normal m-0 col-3'>Name</h6>
            <Form.Control
              className={`${textInputStyles.input}`}
              value={newGroupName}
              style={{borderColor: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem'}}
              placeholder={'Add collection\'s name'}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </div>
          <div className={'d-flex w-100 align-items-center gap-3 mb-2'}>
            <h6 style={{fontSize: '0.8rem'}} className='fw-normal m-0 col-3'>Description</h6>
            <Form.Control
              className={`${textInputStyles.input}`}
              value={newGroupDescription}
              style={{borderColor: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem'}}
              placeholder={'Describe travel collection'}
              onChange={(e) => setNewGroupDescriptipn(e.target.value)}
            />
          </div>
          <div>
            <h6 style={{ fontSize: '0.8rem' }} className='fw-normal m-0 col-3 mb-3'>Regions</h6>
            <Select
              isMulti
              isSearchable
              options={availableRegions}
              value={newGroupRegions}
              onChange={(selected) => setNewGroupRegions(selected)}
              placeholder="Select regions"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.8rem",
                  backgroundColor: "transparent",
                  overflowY: "auto", // Allow scrolling for selected options
                  cursor: "text",
                }),
                input: (base) => ({
                  ...base,
                  color: "white", // Text color for the input field
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "transparent", // Dropdown background color
                  color: "white",
                  //zIndex: 9999, // Ensure dropdown is above other elements
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "rgba(27,64,77,1)" : "rgba(11,28,34,1)", // Highlight focused option
                  color: "white", // Text color
                  cursor: "pointer",
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#333333", // Background for selected options
                  color: "white",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white", // Text color for selected options
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "white", // Remove button color
                  ":hover": {
                    backgroundColor: "red",
                    color: "white",
                  },
                }),
              }}
              menuPlacement="auto" // Automatically adjust dropdown placement
              //menuPortalTarget={document.body} // Render dropdown in the body to avoid clipping
              menuShouldScrollIntoView={true} // Ensure dropdown scrolls into view
            />
          </div>
          <div>
            <h6 style={{ fontSize: '0.8rem' }} className='fw-normal m-0 col-3 mb-3'>Emoji</h6>
          </div>
          <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-light"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{ fontSize: "1.5rem", backgroundColor: "rgba(27,64,77,1)" }}
              >
                {newGroupEmoji || "😀"}
              </button>
              {showEmojiPicker && (
                <div ref={emojiPickerRef} style={{ position: "absolute", zIndex: 1000 }}> 
                  <EmojiPicker className="emoji-picker-react" onEmojiClick={onEmojiClick} lazyLoadEmojis style={{backgroundColor: "rgba(27,64,77,1)"}} skinTonesDisabled />
                </div>
              )}
          </div>
          <div className={'d-flex justify-content-start'}>
            <button
              className='btn ps-0 fw-bold'
              style={{
                fontSize: '0.875rem',
                '--bs-btn-active-border-color': 'transparent',
                '--bs-btn-color': 'rgba(255, 255, 255, 0.7)'
              }}
              onClick={onSave}
            >
              Create new collection
            </button>
            <button
              className='btn ps-0 fw-bold'
              style={{
                fontSize: '0.875rem',
                '--bs-btn-active-border-color': 'transparent',
                '--bs-btn-color': 'rgba(255, 255, 255, 0.7)'
              }}
              onClick={() => setCreateNewGroup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      }
    </>
  );
};


export default GroupRow;