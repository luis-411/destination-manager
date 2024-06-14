// http://localhost:1337/api/users/me?populate[groups][populate][0]=regions
import {useToken} from "../components/AuthProvider/AuthProvider";
import useAxios from "axios-hooks";
import authenticationHeader from "./authenticationHeader";
import { useState } from "react";

const useLoadMeWithGroups = (
  initialPage = 1,
) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/users/me`;
  const token = useToken.getState().token;

  const getParams = () => {
    const params = new URLSearchParams();
    params.append('populate[groups][populate][0]', 'regions');
    return params;
  }

  const [{ data, loading, error },fetch] = useAxios({
    url,
    params: getParams(),
    method: 'GET',
    ...authenticationHeader(token)
  }, {
    useCache:false,
    autoCancel:false
  });


  return { data, fetch ,loading, error };
};


export default useLoadMeWithGroups;