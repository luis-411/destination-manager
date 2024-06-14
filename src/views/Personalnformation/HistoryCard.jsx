import useTravelRecommenderStore from "../../store/travelRecommenderStore";
import Card from "react-bootstrap/Card";
import styles from "./VisitedHistory.module.css";
import {Col, Row} from "react-bootstrap";
import GoToMapCountryButton from "../../components/GoToMapCountry";
import {toImageUrl} from "../../tasks/toImageUrl";
import AppCarousel from "../../components/AppCarousel";

const HistoryCard = ({ historyEntity }) => {
  // const currentImage = historyEntity.images.data?.[0];
  const { countries } = useTravelRecommenderStore();

  const currentRegion = countries?.find(country => country.properties.result.region === historyEntity.region.data?.attributes.Region);
  const regionInfo = {
    region: currentRegion?.properties.result.region,
    score: currentRegion?.properties.result.scores.totalScore
  };
  const currentImages = historyEntity.images.data?.map(image => toImageUrl(image.attributes)) ??
    [require('../../images/default-image.jpg')];

  return (
    <Card className={'rounded-4'}>
      <div
        className={`px-4 position-absolute z-3 text-white d-flex justify-content-between w-100 ${styles.historyRegion}`}
      >
        <h5 className='fa-sm'>{regionInfo.region}</h5>
        <h5 className='fa-sm'>Score: {Math.floor(regionInfo.score)}/100</h5>
      </div>
      <AppCarousel images={currentImages} />
      <Card.Body>
        <Row>
          <Col className={'mb-2 col-6'}>
            <h5 className='fa-xs'>Arrival: {new Date(+historyEntity.arrived * 1000).toLocaleDateString()}</h5>
          </Col>
          <Col className={'mb-2 col-6'}>
            <h5 className='fa-xs text-lg-end'>Review: {historyEntity.review}</h5>
          </Col>
        </Row>
        <Row className={'mb-2'}>
          <Col className={'mb-2 col-6'}>
            <h5 className='fa-xs'>Departure: {new Date(+historyEntity.departed * 1000).toLocaleDateString()}</h5>
          </Col>
          <Col className={'mb-2 col-6'}>
            <h5 className='fa-xs text-lg-end'>Season: {historyEntity.season ?? 'No season'}</h5>
          </Col>
        </Row>
        <Card.Title className='fs-6'>
          {historyEntity.title}
        </Card.Title>
        <Card.Text className={`${styles.description} fa-xs mb-1`}>
          {historyEntity.description}
        </Card.Text>
        <Card.Footer className='border-0 px-0'>
          <Col
            className='col-6'
          >
           <GoToMapCountryButton
             regionId={currentRegion?.properties?.result.id}
           />
          </Col>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default HistoryCard;