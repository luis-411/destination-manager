import useLoadHistory from "../../api/history/useLoadHistory";
import HistoryCard from "./HistoryCard";
import {useMemo} from "react";

const VisitedHistory = ({ userId }) => {
  const { data: historyEntities, loadMore } = useLoadHistory({userId});

  const historyMap = useMemo(() => (
    historyEntities.data.map((historyEntity, key, arr) => (
      <HistoryCard
        key={historyEntity.id}
        historyEntity={historyEntity.attributes}
        isLast={key === (arr.length - 1)}
        loadMoreEntities={loadMore}
      />
    ))
  ), [historyEntities]);

  return (
    <>
      <div className='d-flex justify-content-between mb-2'>
        <h4 className='fs-6 fw-bold'>History</h4>
      </div>
      <div className={'overflow-y-scroll d-flex flex-column gap-4'} style={{ maxHeight: '360px' }}>
        {historyMap}
      </div>
    </>
  )
};

export default VisitedHistory;