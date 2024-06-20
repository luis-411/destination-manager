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

const GroupRow = ({
  id,
  name,
  regions,
  onCreate,
  setCreateNewGroup,
  groups,
  setGroups,
  description,
  arrayPosition
}) => {
  const { executePutGroups } = useUpdateMeWithGroups();
  const { fetch} = useLoadMeWithGroups();
  const [isEditMode, setIsEditMode] = useState(false);
  const [groupName, setGroupName] = useState(name ?? '');
  const [groupDescription, setGroupDescription] = useState(description ?? '');

  const onEditGroup = () => {
    setIsEditMode(true);
  }

  const onCancelSubmitEdit = () => {
    setGroupName(name);
    setGroupDescription(description ?? '');
    setIsEditMode(false);
  }

  const onSubmitEdit = () => {
    const newGroups = set(groups, arrayPosition, {
      ...groups[arrayPosition],
      name: groupName,
      description: groupDescription
    });

    executePutGroups({
      data: {
        groups: newGroups
      }
    }).then((response) => {
      if (response.status < 400) {
        message.success("Travel guide was successfully updated")
        setIsEditMode(false);
      } else {
        throw new Error('Failed to update the travel guide')
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
        message.success("Travel guide deleted successfully")
      } else {
        throw new Error('Failed to delete travel guide')
      }
    }).catch((error) => {
      message.error(error.message);
    })
  }

  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescriptipn] = useState('');
  const onSave = () => {
    executePutGroups({
      data: {
        groups: [...groups, { name: newGroupName, description: newGroupDescription, regions: [] }]
      }
    })
      .then((response) => {
        if (response.status < 400) {
          return fetch().catch((error) => {
            throw new Error('Failed to fetch the travel guide');
          });
        } else {
          throw new Error(response.data.error.message || 'Failed to executePutGroups');
        }
      })
      .then(() => {
        setGroups([...groups, { name: newGroupName, description: newGroupDescription, regions: [] }]);
        setCreateNewGroup(false);
        message.success("Travel guide created successfully");

      })
      .catch((error) => {
        message.error(error.response?.data?.error?.message || error.message);
        setCreateNewGroup(true);
      });
  }

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
                  placeholder={'Edit guide\'s name'}
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
                  placeholder={'Edit guide\'s description'}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              )}
            </div>
            <div className={'d-flex'}>
              <h6 className={`fa-xs lh-1 m-0 fw-bold ${styles.groupRegions}`}>
                {regions.length > 0 ? regions.map(region => (
                  <GoToMapCountryButton key={region.id} regionId={region.id} showText={true} text={region.Region} />
                )) : 'No regions yet'}
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
        <div style={{position: "relative", display: "block"}} className={styles.elementRow}>
          <div className={'d-flex w-100 align-items-center gap-3 mb-2'}>
            <h6 style={{fontSize: '0.8rem'}} className='fw-normal m-0 col-3'>Name</h6>
            <Form.Control
              className={`${textInputStyles.input}`}
              value={newGroupName}
              style={{borderColor: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem'}}
              placeholder={'Add guide\'s name'}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </div>
          <div className={'d-flex w-100 align-items-center gap-3 mb-2'}>
            <h6 style={{fontSize: '0.8rem'}} className='fw-normal m-0 col-3'>Description</h6>
            <Form.Control
              className={`${textInputStyles.input}`}
              value={newGroupDescription}
              style={{borderColor: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem'}}
              placeholder={'Describe travel guide'}
              onChange={(e) => setNewGroupDescriptipn(e.target.value)}
            />
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
              Create new group
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