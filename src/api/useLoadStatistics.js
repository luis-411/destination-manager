import {useToken} from "../components/AuthProvider/AuthProvider";
import useAxios from "axios-hooks";
import authenticationHeader from "./authenticationHeader";


 const useLoadStatistics = () => {
  const token = useToken.getState().token;
  return useAxios({
    url: `${process.env.REACT_APP_BACKEND_URL}/users/me?populate=statistics.recommendations`,
    ...authenticationHeader(token)
  });
};

 export default useLoadStatistics;