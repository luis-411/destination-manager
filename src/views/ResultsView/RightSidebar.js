import "../../styles/App.css";
import useSelectedList from "../../api/useSelectedList";
import RegionCard from "./RegionCard";
import useRightColumnOpen from "../GeneralView/services/useRightColumnOpen";

export const RightSidebar = () => {
  const { selectedList, setSelectedList } = useSelectedList();
  const listRegions = selectedList.regions;
  const { setRightColumnOpen } = useRightColumnOpen();

  const handleClose = () => {
    setSelectedList([]);
    setRightColumnOpen(false);
  };
  return (
    <div className='py-2 pe-2 h-100 overflow-y-scroll overflow-x-hidden'>
      <button onClick={handleClose} className="btn btn-secondary">Close</button>
      <div className="d-flex flex-row align-items-center justify-content-center gap-2" style={{ marginTop: 20 }}>
        <h1 style={{fontSize: "2.5rem", fontWeight: "700", }}>{selectedList.emoji}</h1>
        <h1 style={{ fontWeight: "700", fontSize: "2rem",  }}>{selectedList.title}</h1>
      </div>
      {listRegions?.length > 0 ? (
        <div className="d-flex flex-column align-items-center">
          {listRegions?.map((region, index) => (
            <RegionCard key={index} region={region} />
          ))}
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontWeight: "bold", color: "red" }}>No results found!</p>
        </div>
      )}
    </div>
  );
};
