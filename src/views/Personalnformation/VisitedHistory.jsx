import useLoadHistory from "../../api/history/useLoadHistory";
import HistoryCard from "./HistoryCard";

const VisitedHistory = ({ userId }) => {
  const { data: historyEntities, loading, error } = useLoadHistory({userId});
  if (loading || error) {
    return null;
  }

  return (
    <>
      <div className='d-flex justify-content-between mb-2'>
        <h4 className='fs-6 fw-bold'>History</h4>
      </div>
      <div className={'overflow-y-scroll d-flex flex-column gap-4'} style={{ maxHeight: '360px' }}>
        {historyEntities.data.map((historyEntity, key) => (
          <HistoryCard historyEntity={historyEntity.attributes} key={key} />
        ))}
      </div>
    </>
  )
};

export default VisitedHistory;