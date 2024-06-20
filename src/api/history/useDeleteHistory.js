import {useToken} from "../../components/AuthProvider/AuthProvider";
import useAxios from "axios-hooks";
import authenticationHeader from "../authenticationHeader";
import {useMemo, useState} from "react";


const useDeleteHistory = () => {
  const visitsUrl = `${process.env.REACT_APP_BACKEND_URL}/visits`;
  const token = useToken.getState().token;

  const [{data, loading, error}, execute] = useAxios({
    url: visitsUrl,
    headers: {
      ...authenticationHeader(token).headers,
    },
    method: 'DELETE',
  }, { manual: true, autoCancel: false });
  const [lastDeleted, setLastDeleted] = useState();

  const deleteVisit = (id) => {
    setLastDeleted(() => id);
    return execute({
      url: `${process.env.REACT_APP_BACKEND_URL}/visits/${id}`,
    })
  };

  const checkLastDeleted = useMemo(() => {
    return lastDeleted === data?.data?.id && !!lastDeleted;
  }, [data, lastDeleted]);

  return { data, loading, error, deleteVisit, lastDeleted, checkLastDeleted };
};

export default useDeleteHistory;