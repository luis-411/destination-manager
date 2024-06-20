import useLoadHistory from "../../api/history/useLoadHistory";
import HistoryCard from "./HistoryCard";
import {useEffect, useMemo, useState} from "react";
import useDeleteHistory from "../../api/history/useDeleteHistory";
import {message} from "antd";

const VisitedHistory = ({ userId }) => {
  const { data: historyEntities, loadMore } = useLoadHistory({userId});
  const {
    deleteVisit,
    loading,
    error,
    data: historyData,
    checkLastDeleted
  } = useDeleteHistory();

  const [entities, setEntities] = useState(historyEntities);

  useEffect(() => {
    setEntities(historyEntities);
  }, [historyEntities]);

  useEffect(() => {
    if (checkLastDeleted && !loading && !error) {
      setEntities(entities => {
        return {
          data: [...entities.data.filter(entity => entity.id !== historyData.data.id)],
          meta: entities.meta
        }
      });
      message.success(`Visit with title ${historyData.data.attributes.title} was deleted`);
    } if (error) {
      message.error(`Couldn't remove visitor. Error: ${error.message}`);
    }
  }, [checkLastDeleted]);

  const historyMap = useMemo(() => (
    entities.data.map((historyEntity, key, arr) => (
      <HistoryCard
        key={key}
        historyEntity={historyEntity.attributes}
        id={historyEntity.id}
        isLast={key === (arr.length - 1)}
        loadMoreEntities={loadMore}
        onDelete={deleteVisit}
      />
    ))
  ), [entities]);

  return (
    <>
      <div className='d-flex justify-content-between mb-2'>
        <h4 className='fs-6 fw-bold'>History</h4>
      </div>
      <div className={'overflow-y-scroll pe-2 d-flex flex-column gap-4'} style={{ maxHeight: '360px' }}>
        {entities.data.length === 0 ? (
          <div className='w-full'>
            <h6>No visits yet</h6>
          </div>
        ) : historyMap}
      </div>
    </>
  )
};

export default VisitedHistory;