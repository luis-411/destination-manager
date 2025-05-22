import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { message } from "antd";
import GoToMapCountryButton from "../../components/GoToMapCountry";
import AddVisitView from "../PreferencesView/components/AddVisitView";
import useVisitStore from "../../api/useVisitStore";

const VisitCard = ({
  id : initialId,
  title : initialTitle,
  description : initialDescription,
  regionName : initialRegionName,
  regionId : initialRegionId,
  arriveDate : initialArriveDate,
  departDate : initialDepartDate,
  onDelete
}) => {
    const updateVisit = useVisitStore((state) => state.updateVisit);
    
    const [isHovered, setIsHovered] = useState(false);
    const [visitData, setVisitData] = useState({
      id: initialId,
      title: initialTitle,
      description: initialDescription,
      regionName: initialRegionName,
      regionId: initialRegionId,
      arriveDate: initialArriveDate ? new Date(initialArriveDate) : "",
      departDate: initialDepartDate ? new Date(initialDepartDate) : "",
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
      try {
        await updateVisit(visitData.id, {
          title: visitData.title,
          description: visitData.description,
          region_name: visitData.regionName,
          region_id: visitData.regionId,
          arrive: visitData.arriveDate,
          depart: visitData.departDate,
        });
        message.success("Visit updated successfully!");
        setIsEditing(false);
      }
      catch (error) {
        console.error("Error updating visit:", error);
        message.error("Failed to update visit.");
      }
    }
    const handleCancel = () => {
      setIsEditing(false); // Exit edit mode without saving
    };
  return (
    isEditing ? (
      <AddVisitView
        title={visitData.title}
        onTitleChange={(e) => setVisitData((prev) => ({ ...prev, title: e.target.value }))}
        description={visitData.description}
        onDescriptionChange={(e) => setVisitData((prev) => ({ ...prev, description: e.target.value }))}
        arriveDate={visitData.arriveDate}
        setArriveDate={(date) => {setVisitData({ ...visitData, arriveDate: date }); console.log(visitData.arriveDate)}}
        departDate={visitData.departDate}
        setDepartDate={(date) => setVisitData({ ...visitData, departDate: date })}
        //regions={visitData.regionId}
        setRegions={(region) => setVisitData({ ...visitData, regionId: region.value.id })}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />) : (
    <Card
      className="visit-card shadow-sm rounded-4"
      style={{
        width: "100%",
        margin: "1rem 0",
        padding: "1.5rem",
        border: "1px solid #ddd",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", justifyContent: "center" }}>
          <div>
            <Card.Title style={{ fontWeight: "700", fontSize: "1.5rem", textAlign: "center" }}>{visitData.title}</Card.Title>
            <Card.Subtitle style={{ fontSize: "1rem" }}>{visitData.description || ""}</Card.Subtitle>
          </div>
        </div>
        <div style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <GoToMapCountryButton key={visitData.id} regionId={visitData.regionId} showText={true} text={visitData.regionName} />
        </div>
        {/* show duration of the visit: */}
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Duration:</strong> {visitData.arriveDate && visitData.departDate ? `${Math.round((new Date(visitData.departDate) - new Date(visitData.arriveDate)) / (1000 * 60 * 60 * 24))} days` : "-"}
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Arrive:</strong> {visitData.arriveDate ? new Date(visitData.arriveDate).toLocaleDateString() : "-"}
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Depart:</strong> {visitData.departDate ? new Date(visitData.departDate).toLocaleDateString() : "-"}
        </div>
        {isHovered && (
            <div style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" }}>
          <FaEdit
            color="white"
            size={16}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
          />
          <FaTrash
            color="white"
            size={16}
            style={{ cursor: "pointer" }}
            onClick={onDelete}
          />
        </div>
        )}
      </Card.Body>
    </Card>)
  );
};

export default VisitCard;
