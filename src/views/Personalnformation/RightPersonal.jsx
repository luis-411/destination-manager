import { Col } from "react-bootstrap";
import { useFavouritesPaginationFrontend } from "../../hooks/useFavourites";
import styles from "./RightPersonal.module.css";
import useTravelRecommenderStore from "../../store/travelRecommenderStore";
import useLoadMeWithGroups from "../../api/useLoadMeWithGroups";
import useLoadStatistics from "../../api/useLoadStatistics";
import useUpdateMeWithGroups from "../../api/useUpdateMeWithGroups";
import GoToMapCountryButton from "../../components/GoToMapCountry";
import { useState, useRef, useEffect, useDeferredValue } from "react";
import TextWithInput from "../../components/TextWithInput";
const FavouriteRow = ({ score, region, id }) => {
  return (
    <div className={styles.elementRow}>
      <Col className='col-6 d-flex flex-column'>
        {score && <h6 className='fa-xs lh-1 fw-bold'>Score {Math.floor(score)}/100</h6>}
        <h5 className={`fs-6 fw-bold ${styles.groupRegions}`}>{region}</h5>
      </Col>
      <Col className={'d-flex justify-content-evenly align-items-center ms-5'}>
        <GoToMapCountryButton regionId={id} />
      </Col>
    </div>
  )
};

const GroupRow = ({ name, regions, onCreate, setCreateNewGroup, groups, setGroups }) => {
  const { data: dataPut, executePutGroups, loading: putLoading, error: putError } = useUpdateMeWithGroups();
  const { data: meData, fetch, loading: groupsLoading } = useLoadMeWithGroups();
  return (
    <>
      {!onCreate && <div className={styles.elementRow}>
        <Col className='col-8 d-flex flex-column'>
          <h5 className='fs-6 fw-bold'>{name}</h5>
          <h6 className={`fa-xs lh-1 fw-bold ${styles.groupRegions}`}>
            {regions.map(region => region.u_name).join(', ')}
          </h6>
        </Col>
        <Col className={'d-flex justify-content-evenly align-items-center'}>
          <span className='fa-xs'>Show More</span>
        </Col>


      </div>}

      {onCreate &&
        <div style={{ position: "relative", display: "block" }} className={styles.elementRow}>
          <div style={{ marginTop: "1rem" }}>
            <TextWithInput
              text={""}
              createNewGroup={onCreate}
              setCreateNewGroup={setCreateNewGroup}
              style={{ marginTop: "1rem" }}
              defaultText={'No group'}
              onSave={(groupName) => {
                executePutGroups({
                  data: {
                    "groups": [...groups, { name: groupName, regions: [] }]
                  }
                }).then((response) => {
                  if(response.status >= 200 && response.status < 300){
                  fetch().then(() => {        
                    setGroups([...groups, { name: groupName, regions: [] }])
                    setCreateNewGroup(false)
                  })}
                })
                

              }}
            />
          </div>
        </div>
      }
    </>

  )
}

const RightPersonal = () => {
  const { data: favourites } = useFavouritesPaginationFrontend();
  const { countries } = useTravelRecommenderStore();
  const scrollRef = useRef();

  const regions = countries.reduce((acc, country) => ({
    ...acc,
    [country.properties.result.uname]: {
      name: country.properties.name,
      score: country.properties.result.scores.totalScore,
      id: country.properties.result?.id
    },
  }
  ), {});

  const { data: meData, loading: groupsLoading } = useLoadMeWithGroups();
  const [{ data: statsData, loading: statsLoading }] = useLoadStatistics();
  const [newGroupCreation, setNewGroupCreation] = useState(false);
  useEffect(() => {
    newGroupCreation && scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [newGroupCreation])

  const [groups, setGroups] = useState([]);
  useEffect(() => {
    {!groupsLoading && meData && setGroups(meData?.groups)}
  } , [groupsLoading])
  if (groupsLoading || statsLoading) {
    return null;
  }

  const suggestions = statsData.statistics?.recommendations ?? [];
  return (
    <div className='p-3 d-flex flex-column gap-4'>
      {suggestions.length > 0 && (
        <Col>
          <h5 className='fs-6 fw-bold pb-2'>Personal Recommendations</h5>
          <div className={styles.favouritesHeight}>
            <div className={'d-flex flex-column gap-3'}>
              {suggestions.map(suggestion => (
                <FavouriteRow
                  key={suggestion.id}
                  region={regions[suggestion.u_name].name}
                  score={regions[suggestion.u_name].score}
                  id={regions[suggestion.name].id}
                />
              ))}
            </div>
          </div>
        </Col>
      )}
      <Col>
        <h5 className='fs-6 fw-bold pb-2'>Favourite Regions</h5>
        <div className={styles.favouritesHeight}>
          <div className={'d-flex flex-column gap-3'}>
            {favourites.data.map(favourite => (
              <FavouriteRow
                key={favourite.id}
                region={regions[favourite.name].name}
                score={regions[favourite.name].score}
                id={regions[favourite.name].id}
              />
            ))}
          </div>
        </div>
      </Col>
      <Col>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <h5 className='fs-6 fw-bold pb-2'>Groups</h5>
          <span onClick={() => {
            setNewGroupCreation(true);
          }
          }
            style={{ cursor: "pointer", fontSize: "15px", marginRight: "25px" }}>Add group</span>
        </div>
        <div ref={scrollRef} className={styles.favouritesHeight}>
          <div className={'d-flex flex-column gap-3'}>
            {groups.map(group => (
              <GroupRow
                key={group.id}
                name={group.name}
                regions={group.regions}
                onCreate={false}
              />
            ))}
            {newGroupCreation && <div style={{ display: "block" }}>
              <GroupRow
                setGroups={setGroups}
                groups={groups}
                setCreateNewGroup={setNewGroupCreation}
                onCreate={newGroupCreation} />
            </div>}
          </div>
        </div>
      </Col>
    </div>
  );
};

export default RightPersonal;