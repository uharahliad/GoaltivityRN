import users from './src/api/users';
import {BACK_URL} from '@env';

export const handleFile = async file => {
  const privateUrl = `users/avatar/${file.fileName}`;
  await users.uploadImage(createFormData(file));

  return {
    name: file.fileName,
    sizeInBytes: file.fileSize,
    privateUrl,
    publicUrl: `${BACK_URL}/api/file/download?privateUrl=${privateUrl}`,
    new: true,
  };
};

const createFormData = photo => {
  const data = new FormData();

  data.append('filename', photo.fileName);
  data.append('file', {
    uri: photo.uri,
    type: photo.type,
    name: photo.fileName,
  });

  return data;
};
