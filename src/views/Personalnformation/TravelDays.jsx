import useLoadHistory from "../../api/history/useLoadHistory";
import {useEffect, useState} from "react";

const TravelDays = ({ userId }) => {
  const { data: historyEntities } = useLoadHistory({userId});
  const [entities, setEntities] = useState(historyEntities);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    setEntities(historyEntities);
  }, [historyEntities]);

  useEffect(() => {
      if (entities && entities.data) {
        const alldays = entities.data.map((historyEntity) => {
          const { arrived, departed } = historyEntity.attributes;
          if (arrived && departed) {
            return (departed - arrived) / (1000 * 60 * 60 * 24);
          }
          return 0;
        });
        setTotal(Math.ceil(alldays.reduce((sum, days) => sum + days, 0)));
      }
    }, [entities]);
  return (
    <div className="d-flex flex-row justify-content-between align-items-center mb-4">
      <h4 className='fs-6 fw-bold'>Total Travel Time: </h4>
      <h4 className='fs-6'>{total} Days</h4>
    </div>
  );
};

export default TravelDays;