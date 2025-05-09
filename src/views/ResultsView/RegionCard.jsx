import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DetailScores } from "../MapView/components/DetailScores";
import GoToMapCountryButton from "../../components/GoToMapCountry";

const RegionCard = ({ region, onViewDetails }) => {
    function getTrueKeys(peakSeason) {
        if(peakSeason) {
        return Object.keys(peakSeason).filter(month => peakSeason[month]);
        }
        return [];
      }
  return (
    <Card className="shadow-sm rounded-4" style={{ width: '18rem', margin: '1rem', backgroundColor: '#f8f9fa', border: '1px solid #ddd' }}>
      <Card.Body>
        <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 0 }}>{region.label}</Card.Title>
        <Card.Text>
          {region.value.ParentRegion.data.attributes.Region}
        </Card.Text>
        <DetailScores
                peakSeasons={getTrueKeys(region.value.peakSeason)}
                visitorIndexes={region.value.visitorIndex}
              />
        {/* <Button variant="primary" onClick={() => onViewDetails(region)}>
          View Details
        </Button> */}
        <GoToMapCountryButton regionId={region.value.id} />
      </Card.Body>
    </Card>
  );
};

export default RegionCard;