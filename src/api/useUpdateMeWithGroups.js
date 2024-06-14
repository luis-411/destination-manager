// http://localhost:1337/api/users/me
import {useToken} from "../components/AuthProvider/AuthProvider";
import useAxios from "axios-hooks";
import authenticationHeader from "./authenticationHeader";

const useUpdateMeWithGroups = (
  initialPage = 1,
) => {
  const visitsUrl = `${process.env.REACT_APP_BACKEND_URL}/users/1`;
  const token = useToken.getState().token;

  const [{ data, loading, error }, executePutGroups] = useAxios({
    url: visitsUrl,
    method: "PUT",
    ...authenticationHeader(token)
  },
  { manual: true });


  return { data,executePutGroups,loading, error };
};

export default useUpdateMeWithGroups;
