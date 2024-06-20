import useUpdateMeWithGroups from "../api/useUpdateMeWithGroups";
import useLoadMeWithGroups from "../api/useLoadMeWithGroups";
import {message} from "antd";
import styles from "../views/Personalnformation/RightPersonal.module.css";
import {Col, Row} from "react-bootstrap";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import TextWithInput from "./TextWithInput";

const GroupRow = ({ id, inputRef, name, regions, onCreate, setCreateNewGroup, groups, setGroups, description }) => {
  const { executePutGroups } = useUpdateMeWithGroups();
  const { fetch} = useLoadMeWithGroups();
  const deleteGroup = () => {
    executePutGroups({
      data: {
        groups: groups.filter((group) => group.id !== id)
      }
    }).then((response) => {
      if (response.status < 400) {
        setGroups(groups.filter((group) => group.id !== id))
        message.success("Group deleted successfully")
      } else {
        throw new Error('Failed to delete the group')
      }
    }).catch((error) => {
      message.error(error.message);
    })
  }
  const onSave = (groupName) => {
    executePutGroups({
      data: {
        groups: [...groups, { name: groupName, regions: [] }]
      }
    })
      .then((response) => {
        if (response.status < 400) {
          return fetch().catch((error) => {
            throw new Error('Failed to fetch the groups');
          });
        } else {
          throw new Error(response.data.error.message || 'Failed to executePutGroups');
        }
      })
      .then(() => {
        setGroups([...groups, { name: groupName, regions: [] }]);
        setCreateNewGroup(false);
        message.success("Group created successfully");

      })
      .catch((error) => {
        message.error(error.response?.data?.error?.message || error.message);
        setCreateNewGroup(true);
      });
  }
  return (
    <>
      {!onCreate && <div className={styles.elementRow}>
        <Col className='col-8 d-flex flex-column'>
          <div style={{display: "flex", alignItems: "center"}}>
            <h5 style={{display: "inline"}} className='fw-bold fs-6'>{name}</h5>
          </div>
          <div style={{display: "flex", alignItems: "center"}}>
            <h5 style={{display: "inline", fontSize: '0.8rem'}} className='fw-bold'>{description ?? 'No description'}</h5>
          </div>
          <div className={'d-flex'}>
            <h6 className={`fa-xs lh-1 fw-bold ${styles.groupRegions}`}>
              {regions.map(region => region.Region).join(', ')}
            </h6>
          </div>
        </Col>
        <Col className={'d-flex justify-content-end cursor align-items-center'}>
          <button className="btn text-white">
            <EditOutlined/>
          </button>
          <button onClick={deleteGroup} className="btn text-white">
            <DeleteOutlined/>
          </button>
        </Col>
      </div>}

      {onCreate &&
        <div style={{position: "relative", display: "block"}} className={styles.elementRow}>
          <Row style={{marginTop: "1rem"}}>
          <h6 className='fw-normal col-3'>Name</h6>
            <TextWithInput
              text={""}
              inputRef={inputRef}
              createNewGroup={onCreate}
              setCreateNewGroup={setCreateNewGroup}
              style={{marginTop: "1rem"}}
              defaultText={'No group'}
              onSave={onSave}
            />
          </Row>
        </div>
      }
    </>
  );
};


export default GroupRow;