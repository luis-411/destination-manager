import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { DetailScores } from "../MapView/components/DetailScores";
import GoToMapCountryButton from "../../components/GoToMapCountry";
import useCountries from "../../api/useCountries";

const RegionCard = ({ region, onViewDetails }) => {
  const {countries, fetchCountries} = useCountries();

  useEffect(() =>{
      fetchCountries();
    }, [fetchCountries]);

  function getCountryTravelMonths(countryId) {
    const country = countries.find((country) => country.properties.result.id === countryId);
    if (country) {
      return country.properties.result.travelMonths;
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
                travelMonths={getCountryTravelMonths(region.value.id)}
              />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <GoToMapCountryButton regionId={region.value.id} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default RegionCard;