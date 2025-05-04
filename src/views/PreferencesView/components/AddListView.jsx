import React from "react";
import Card from "react-bootstrap/Card";
import RegionsSelect from "../../../components/RegionsSelect";
import CustomEmojiPicker from "../../../components/CustomEmojiPicker";

const AddListView = ({
  listEmoji,
  setListEmoji,
  listRegions,
  setListRegions,
  handleTitleChange,
  handleDescriptionChange,
  addListSupabase,
}) => {
  return (
    <Card className="p-4 rounded-4">
      <div className="mb-3">
        <label
          htmlFor="listTitle"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="listTitle"
          placeholder="Enter title"
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="listDescription"
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Description
        </label>
        <textarea
          className="form-control"
          id="listDescription"
          rows="3"
          placeholder="Enter description"
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Emoji
        </label>
        <CustomEmojiPicker emoji={listEmoji} setEmoji={setListEmoji} />
      </div>
      <div className="mb-3">
        <label
          className="form-label"
          style={{ textAlign: "left", display: "block" }}
        >
          Regions
        </label>
        <RegionsSelect regions={listRegions} setRegions={setListRegions} />
      </div>
      <button className="btn btn-primary" onClick={addListSupabase}>
        Add List
      </button>
    </Card>
  );
};

export default AddListView;