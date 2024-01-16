const mimeTypes = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  webp: 'image/webp',
  gif: 'image/gif',
};

export const singleImageUploadLimits = {
  fileSize: 1024 * 1024 * 5, // 5 MB
  files: 1,
};

export const imageMimeTypes = [
  mimeTypes.jpeg,
  mimeTypes.jpg,
  mimeTypes.png,
  mimeTypes.webp,
  mimeTypes.gif,
];

// map mime types into react-dropzone format
export const acceptImageMimeTypes = imageMimeTypes.reduce<Record<string, string[]>>(
  (acc, mimeType) => ({
    ...acc,
    [mimeType]: [],
  }),
  {},
);

const fileConstants = {
  mimeTypes,
  imageMimeTypes,
  acceptImageMimeTypes,
  singleImageUploadLimits,
};

export default fileConstants;
