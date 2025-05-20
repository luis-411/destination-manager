import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { message } from "antd";
import GoToMapCountryButton from "../../components/GoToMapCountry";

const VisitCard = ({
  id,
  title,
  description,
  regionName,
  regionId,
  arriveDate,
  departDate,
  onEdit,
  onDelete
}) => {
    const [isHovered, setIsHovered] = useState(false);
  return (
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
            <Card.Title style={{ fontWeight: "700", fontSize: "1.5rem", textAlign: "center" }}>{title}</Card.Title>
            <Card.Subtitle style={{ fontSize: "1rem" }}>{description || ""}</Card.Subtitle>
          </div>
        </div>
        <div style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <GoToMapCountryButton key={id} regionId={regionId} showText={true} text={regionName} />
        </div>
        {/* show duration of the visit: */}
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Duration:</strong> {arriveDate && departDate ? `${Math.round((new Date(departDate) - new Date(arriveDate)) / (1000 * 60 * 60 * 24))} days` : "-"}
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Arrive:</strong> {arriveDate ? new Date(arriveDate).toLocaleDateString() : "-"}
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Depart:</strong> {departDate ? new Date(departDate).toLocaleDateString() : "-"}
        </div>
        {isHovered && (
            <div style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex", gap: "10px" }}>
          <FaEdit
            color="white"
            size={16}
            style={{ cursor: "pointer" }}
            onClick={onEdit}
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
    </Card>
  );
};

export default VisitCard;
