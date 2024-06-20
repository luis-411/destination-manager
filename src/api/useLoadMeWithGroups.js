// http://localhost:1337/api/users/me?populate[groups][populate][0]=regions
import {useToken} from "../components/AuthProvider/AuthProvider";
import useAxios from "axios-hooks";
import authenticationHeader from "./authenticationHeader";
import {useAuthContext} from "../context/AuthContext";
import {useEffect, useState} from "react";

const useLoadMeWithGroups = () => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/users/me`;
  const token = useToken.getState().token;
  const { user } = useAuthContext();
  const getParams = () => {
    const params = new URLSearchParams();
    params.append('populate[groups][populate][0]', 'regions');
    return params;
  }

  const [axiosOptions] = useState({
    useCache:false,
    autoCancel:false,
    manual: !user?.id
  });

  console.log(axiosOptions);
  const [{ data, loading, error },fetch] = useAxios({
    url,
    params: getParams(),
    method: 'GET',
    ...authenticationHeader(token)
  }, axiosOptions);

  useEffect(() => {
    if (user?.id && axiosOptions.manual) {
      fetch();
    }
  }, [user])


  return { data, fetch, loading, error };
};


export default useLoadMeWithGroups;