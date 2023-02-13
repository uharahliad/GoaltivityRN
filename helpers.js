import {Platform} from 'react-native';

export const createFormData = async (photo, body = {}) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });
  data.append('filename', photo.fileName);

  console.log(data);

  return data;
};
