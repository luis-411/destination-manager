import {Col} from "react-bootstrap";
import {useFavouritesPaginationFrontend} from "../../hooks/useFavourites";
import {GlobalOutlined} from "@ant-design/icons";
import styles from "./RightPersonal.module.css";
import useTravelRecommenderStore from "../../store/travelRecommenderStore";
import useLoadMeWithGroups from "../../api/useLoadMeWithGroups";
import useLoadStatistics from "../../api/useLoadStatistics";

const FavouriteRow = ({ score, region }) => {
  return (
    <div className={styles.elementRow}>
      <Col className='col-8 d-flex flex-column'>
        {score && <h6 className='fa-xs lh-1 fw-bold'>Score {Math.floor(score)}/100</h6>}
        <h5 className={`fs-6 fw-bold ${styles.groupRegions}`}>{region}</h5>
      </Col>
      <Col className={'d-flex justify-content-evenly align-items-center'}>
        <GlobalOutlined/>
        <span className='fa-xs'>Show on map</span>
      </Col>
    </div>
  )
};

const GroupRow = ({ name, regions }) => {
  return (
    <div className={styles.elementRow}>
      <Col className='col-8 d-flex flex-column'>
        <h5 className='fs-6 fw-bold'>{name}</h5>
        <h6 className={`fa-xs lh-1 fw-bold ${styles.groupRegions}`}>
          {regions.map(region => region.u_name).join(', ')}
        </h6>
      </Col>
      <Col className={'d-flex justify-content-evenly align-items-center'}>
        <span className='fa-xs'>Show More</span>
      </Col>
    </div>
  )
}

const RightPersonal = () => {
  const {data: favourites} = useFavouritesPaginationFrontend();
  const { countries } = useTravelRecommenderStore();
  const regions = countries.reduce((acc, country) => ({
      ...acc,
      [country.properties.result.uname]: {
        name: country.properties.name,
        score: country.properties.result.scores.totalScore
      },
    }
  ), {});

  const { data: meData, loading: groupsLoading } = useLoadMeWithGroups();
  const [{ data: statsData, loading: statsLoading }] = useLoadStatistics();

  if (groupsLoading || statsLoading) {
    return null;
  }
  const groups = meData.groups ?? [];
  const suggestions = statsData.statistics.recommendations ?? [];

  return (
    <div className='p-3 d-flex flex-column gap-4'>
      <Col>
        <h5 className='fs-6 fw-bold pb-2'>Personal Recommendations</h5>
        <div className={styles.favouritesHeight}>
          <div className={'d-flex flex-column gap-3'}>
            {suggestions.map(suggestion => (
              <FavouriteRow
                key={suggestion.id}
                region={regions[suggestion.u_name].name}
                score={regions[suggestion.u_name].score}
              />
            ))}
          </div>
        </div>
      </Col>
      <Col>
        <h5 className='fs-6 fw-bold pb-2'>Favourite Regions</h5>
        <div className={styles.favouritesHeight}>
          <div className={'d-flex flex-column gap-3'}>
            {favourites.data.map(favourite => (
              <FavouriteRow
                key={favourite.id}
                region={regions[favourite.name].name}
                score={regions[favourite.name].score}
              />
            ))}
          </div>
        </div>
      </Col>
      <Col>
        <h5 className='fs-6 fw-bold pb-2'>Groups</h5>
        <div className={styles.favouritesHeight}>
          <div className={'d-flex flex-column gap-3'}>
            {groups.map(group => (
              <GroupRow
                key={group.id}
                name={group.name}
                regions={group.regions}
              />
            ))}
          </div>
        </div>
      </Col>
    </div>
  );
};

export default RightPersonal;