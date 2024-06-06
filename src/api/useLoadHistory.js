import {useState} from "react";
import useAxios from "axios-hooks";
import authenticationHeader from "./authenticationHeader";
import {useToken} from "../components/AuthProvider/AuthProvider";

// http://localhost:1337/api/visits?pagination[page]=1&pagination[pageSize]=10&populate=*&filters[user][id][$eq]=1
const useLoadHistory = ({
  initialPage = 1,
  pageSize = 8,
  userId
}) => {
  const [page, setPage] = useState(initialPage);
  const visitsUrl = `${process.env.REACT_APP_BACKEND_URL}/visits`;
  const token = useToken.getState().token;

  const getParams = () => {
    const params = new URLSearchParams(visitsUrl);
    params.append('pagination[page]', String(page));
    params.append('pagination[pageSize]', String(pageSize));
    params.append('populate', 'images,region');
    params.append('filters[user][id][$eq]', userId);
    return params;
  }

  const loadMore = () => {
    setPage(page + 1);
  }

  const [{ data, loading, error }] = useAxios({
    url: visitsUrl,
    params: getParams(),
    ...authenticationHeader(token)
  });


  return { data, loading, error, loadMore };
};

export default useLoadHistory;