import useAxios from "axios-hooks";
import authenticationHeader from "../authenticationHeader";
import {useToken} from "../../components/AuthProvider/AuthProvider";


const useUploadFile = () => {
  const token = useToken.getState().token;
  const [{ loading, error, data }, execute] = useAxios({
    url: `${process.env.REACT_APP_BACKEND_URL}/upload`,
    method: 'POST',
    ...authenticationHeader(token)
  }, { manual: true });

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('files', file);
    return execute({
      data: formData
    }).catch(e => console.error(e));
  }

  return { uploadFile, loading, error, data };
};

const useRemoveFile = () => {
  const token = useToken.getState().token;
  const [, execute] = useAxios({
    method: 'DELETE',
    ...authenticationHeader(token)
  }, { manual: true });

  const removeFile = async (id) => {
    return execute({
       url: `${process.env.REACT_APP_BACKEND_URL}/upload/files/${id}`
    })
  }

  return { removeFile }
}

const useUploadImages = ({ userId }) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`;
  const token = useToken.getState().token;
  const [{ loading, error }, execute] = useAxios({
    url,
    method: 'PUT',
    ...authenticationHeader(token)
  }, { manual: true });
  const { uploadFile } = useUploadFile();
  const { removeFile } = useRemoveFile();

  const uploadCover = async (coverFile, personalInfo) => {
    if (personalInfo.coverPhoto) {
      await removeFile(personalInfo.coverPhoto.id);
    }
    await uploadFile(coverFile).then(response => {
      const id = response.data[0].id;
      execute({
        data: { coverPhoto: id },
      })
        .catch(e => console.error(e))
        .then(r => console.log(response))
      ;
    });
    // formData.append('files.coverPhoto', coverFile, coverFile.name);
    // formData.append('data', JSON.stringify({ occupation: 'LAZ' }));

  }

  return { loading, error, uploadCover };
};

export default useUploadImages;