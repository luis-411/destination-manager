import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RegionsSelect from "../../../components/RegionsSelect";
import useVisits from "../../../api/useVisits";
import { useAuthContextSupabase } from "../../../context/AuthContextSupabase";
import { message } from "antd";

const AddVisitView = ({ addVisitSupabase, handleCancel }) => {
  const { addVisit } = useVisits();
  const { user } = useAuthContextSupabase();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [arriveDate, setArriveDate] = useState(null);
  const [departDate, setDepartDate] = useState(null);
  const [regions, setRegions] = useState(null);

  const handleSave = () => {
    const visitData = {
      title: title,
      description: description,
      arrive: arriveDate,
      depart: departDate,
      region_name: regions.label,
      region_id: regions.value.id,
      user_id: user?.id,
    };
    try {
        //TODO: reload map to show new visit
        addVisit(visitData);
        setTitle("");
        setDescription("");
        setArriveDate(null);
        setDepartDate(null);
        setRegions(null);
    }
    catch (e) {
        message.error(`Unexpected error while creating the visit. Please try again.\n Error ${e.message}`);
    }
  };

  return (
    <Card
      className="p-4 rounded-4"
      style={{
        width: "100%",
        margin: "1rem 0",
        padding: "1.5rem",
        border: "1px solid #ddd",
        transition: "transform 0.2s ease-in-out",
        position: "relative",
      }}
    >
      <div className="mb-3">
        <label
          htmlFor="visitTitle"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Title
        </label>
        <input
          value={title}
          type="text"
          className="form-control"
          id="visitTitle"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="visitDescription"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Description
        </label>
        <textarea
          value={description}
          className="form-control"
          id="visitDescription"
          rows="3"
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label
          htmlFor="visitRegion"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Region
        </label>
        <RegionsSelect setRegions={setRegions} isVisit={true}/>
      </div>
      <div className="mb-3">
        <label
          htmlFor="arriveDate"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Arrive Date
        </label>
        <DatePicker
          selected={arriveDate}
          onChange={(date) => setArriveDate(date)}
          placeholderText="Select arrive date"
          className="form-control"
          id="arriveDate"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="departDate"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Depart Date
        </label>
        <DatePicker
          selected={departDate}
          onChange={(date) => setDepartDate(date)}
          placeholderText="Select depart date"
          className="form-control"
          id="departDate"
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        {handleCancel ? "Save" : "Add Visit"}
      </button>
      {handleCancel && (
        <button className="btn btn-primary mt-2" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </Card>
  );
};

export default AddVisitView;
