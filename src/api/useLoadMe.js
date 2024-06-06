


// http://localhost:1337/api/users/me?populate=coverPhoto,profilePhoto
// needed to retrieve full information of the user
import useAxios from "axios-hooks";
import {useToken} from "../components/AuthProvider/AuthProvider";
import authenticationHeader from "./authenticationHeader";

// http://localhost:1337/api/users/me?populate[groups][populate][0]=regions
const useLoadMe = () => {
  const token = useToken.getState().token;
  return useAxios({
    url: `${process.env.REACT_APP_BACKEND_URL}/users/me?populate=coverPhoto,profilePhoto`,
    ...authenticationHeader(token)
  });
};

export default useLoadMe;