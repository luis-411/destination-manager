import useAxios from "axios-hooks";
import authenticationHeader from "../authenticationHeader";
import {useToken} from "../../components/AuthProvider/AuthProvider";
import {useAuthContext} from "../../context/AuthContext";


const usePostHistory = () => {
  const visitsUrl = `${process.env.REACT_APP_BACKEND_URL}/visits`;
  const token = useToken.getState().token;
  const auth = useAuthContext();


  const [{data, loading, error}, execute] = useAxios({
    url: visitsUrl,
    ...authenticationHeader(token),
    method: 'POST',
    'Content-Type': 'multipart/form-data'
  }, { manual: true });

  /**
   *
   * @param {Map} visit - visit map object
   * @param {Array} fileKeys - string of keys which correspond to being files
   */
  const createNewVisit = (visit, fileKeys) => {
    const data = {};
    const formData = new FormData();

    visit.forEach((value, key) => {
      if (fileKeys.includes(key)) {
        value.forEach((file, idx) => {
          formData.append('files.images', file, file.name);
        })
      } else {
        data[key] = value;
      }
    });

    data.user = auth.user.id;
    data.region = data.region.id;
    formData.append('data', JSON.stringify(data));

    execute({
      data: formData,
    })
      .then(r => console.log(r))
      .catch(e => console.error(e));
  }


  return { data, loading, error, createNewVisit };
}


export default usePostHistory;