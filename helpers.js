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

export const fixImgUri = uri => {
  if (uri.includes(BACK_URL)) {
    return uri;
  } else {
    return `${BACK_URL}${uri}`;
  }
};

export const getIconColor = status => {
  switch (status) {
    case 'To Do':
      return '#8DC63F';
    case 'Done':
    case 'In Progress':
      return '#FFFFFF';
  }
};
