import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RegionsSelect from "../../../components/RegionsSelect";
import { useAuthContextSupabase } from "../../../context/AuthContextSupabase";
import { message } from "antd";
import useVisitsStore from "../../../api/useVisitStore";

const AddVisitView = ({  
  handleCancel,
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  arriveDate,
  setArriveDate,
  departDate,
  setDepartDate,
  regions,
  setRegions,
  handleSave
 }) => {
  const fetchVisits = useVisitsStore((state) => state.fetchVisits);
  const addVisit = useVisitsStore((state) => state.addVisit);
  const { user } = useAuthContextSupabase();
  const [titleAdd, setTitleAdd] = useState("");
  const [descriptionAdd, setDescriptionAdd] = useState("");
  const [arriveDateAdd, setArriveDateAdd] = useState(null);
  const [departDateAdd, setDepartDateAdd] = useState(null);
  const [regionsAdd, setRegionsAdd] = useState(null);

  const handleAdd = () => {
    const visitData = {
      title: titleAdd,
      description: descriptionAdd,
      arrive: arriveDateAdd,
      depart: departDateAdd,
      region_name: regionsAdd?.label,
      region_id: regionsAdd?.value.id,
      user_id: user?.id,
    };
    try {
        if(visitData.arrive && visitData.depart && visitData.region_id) {
          addVisit(visitData);
          setTitleAdd("");
          setDescriptionAdd("");
          setArriveDateAdd(null);
          setDepartDateAdd(null);
          setRegionsAdd(null);
        }
        else {
          message.error("please enter the missing value(s)")
        }
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
          value={handleCancel ? title : titleAdd}
          type="text"
          className="form-control"
          id="visitTitle"
          placeholder="Enter title"
          onChange={handleCancel ? onTitleChange : (e) => setTitleAdd(e.target.value)}
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
          value={handleCancel ? description : descriptionAdd}
          className="form-control"
          id="visitDescription"
          rows="3"
          placeholder="Enter description"
          onChange={handleCancel ? onDescriptionChange : (e) => setDescriptionAdd(e.target.value)}
        ></textarea>
      </div>
      {!handleCancel && (<div className="mb-3">
        <label
          htmlFor="visitRegion"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Region
        </label>
        <RegionsSelect setRegions={setRegionsAdd} isVisit={true}/>
      </div>)}
      <div className="mb-3">
        <label
          htmlFor="arriveDate"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Arrive Date
        </label>
        <DatePicker
          selected={handleCancel ? arriveDate : arriveDateAdd}
          onChange={handleCancel ? setArriveDate : setArriveDateAdd}
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
          selected={handleCancel ? departDate : departDateAdd}
          onChange={handleCancel ? setDepartDate : setDepartDateAdd}
          placeholderText="Select depart date"
          className="form-control"
          id="departDate"
        />
      </div>
      <button className="btn btn-primary" onClick={handleCancel ? handleSave : handleAdd}>
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
