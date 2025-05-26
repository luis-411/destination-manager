import { useState, useEffect } from "react";
import LoadCountriesTask from "../../tasks/LoadCountriesTask";
import message from "antd/lib/message";

export default function AddToListModal({ lists, updateList, country, onClose, fetchLists, user }) {
  const [selectedListId, setSelectedListId] = useState("");
  const [adding, setAdding] = useState(false);
  const [fileRetrieved, setFileRetrieved] = useState([]);
  const [regionData, setRegionData] = useState(null);

  const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setFileRetrieved);
    };
    useEffect(load, []);
    useEffect(() => {
        setRegionData(fileRetrieved)
    }, [fileRetrieved]);    

  const handleAdd = async () => {
    if (!selectedListId) return;
    const list = lists.find(l => l.id === parseInt(selectedListId));
    if (!list) {
      message.error("List not found");
      return;
    }
    const alreadyInList = list.regions?.some(r => r.value?.id === country.id);
    if (alreadyInList) {
      message.error("Region already in list");
      return;
    }
    const region = regionData.find(r => r.id === country.id);
    const regionValue = {label: region.Region, value: region};

    setAdding(true);
    const updatedRegions = [...list.regions, regionValue];
    await updateList(selectedListId, { regions: updatedRegions });
    await fetchLists(user);
    setAdding(false);
    onClose();
  };

  return (
    <div style={{ minWidth: 300 }}>
      <h5 className="mb-3">Add {country.region} to a list</h5>
      <select
        className="form-select mb-2"
        value={selectedListId}
        onChange={e => setSelectedListId(e.target.value)}
      >
        <option value='' disabled>Select a list</option>
        {lists.map(list => (
          <option key={list.id} value={list.id}>{list.title}</option>
        ))}
      </select>
      <div className="d-flex justify-content-end gap-2 mt-2">
        <button
          className="btn btn-secondary btn-sm"
          onClick={onClose}
          disabled={adding}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleAdd}
          disabled={!selectedListId || adding}
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}