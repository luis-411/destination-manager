import React from "react";
import { useMap } from "usehooks-ts";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { message } from "antd";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";
import { useAppModal } from "../AppModal";
import useVisitsStore from "../../api/useVisitStore";

const HandleVisit = ({ country, handleCancel }) => {
  const { reset } = useAppModal();
  const addVisit = useVisitsStore((state) => state.addVisit);
  const { user } = useAuthContextSupabase();
  const [visit, visitActions] = useMap([
    ["user_id", user?.id],
    ["title", ""],
    ["description", ""],
    ["region_id", country.id],
    ["region_name", country.region],
    ["arrive", ""],
    ["depart", ""],
  ]);

  const handleSave = async () => {
    const visitData = Object.fromEntries(visit.entries());
    try {
      await addVisit(visitData);
      //message.success(`New visit with title "${visitData.title}" was added`);
      reset();
    } catch (e) {
      message.error(`Unexpected error while creating the visit. Please try again.\n Error ${e.message}`);
    }
  };

  return (
    <div className={"px-4"}>
      <h4 className={"fa-sm ms-2 mb-4 fw-bold"}>Create new visit to {country.region}</h4>
      <div className={"d-flex flex-column gap-2"}>
        <div >
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            value={visit.get("title")}
            id="title"
            placeholder="Title"
            onChange={(e) => visitActions.set("title", e.target.value)}
          />
        </div>
        <div>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            value={visit.get("description")}
            id="description"
            as="textarea"
            placeholder="Details from your trip"
            onChange={(e) => visitActions.set("description", e.target.value)}
          />
        </div>
        <div className={"d-flex flex-column"}>
          <Form.Label htmlFor="arrive">Arrived</Form.Label>
          <DatePicker
            placeholderText="Select arrive date"
            selected={visit.get("arrive")}
            onChange={(date) => visitActions.set("arrive", date)}
          />
        </div>
        <div className={"d-flex flex-column"}>
          <Form.Label htmlFor="depart">Departed</Form.Label>
          <DatePicker
            placeholderText="Select depart date"
            selected={visit.get("depart")}
            onChange={(date) => visitActions.set("depart", date)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center mt-3">
        <button
          className="me-3 btn"
          style={{ fontSize: "12px", color: "white", whiteSpace: "nowrap" }}
          onClick={reset}
        >
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default HandleVisit;