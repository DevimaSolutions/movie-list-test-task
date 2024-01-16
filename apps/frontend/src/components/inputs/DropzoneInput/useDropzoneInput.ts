import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import type { DropzoneInputProps } from './types';
import type { DropEvent, FileRejection } from 'react-dropzone';

const useDropzoneInput = ({
  defaultPreview,
  field,
  form: { setFieldValue },
  multiple,
  ...dropzoneOptions
}: Omit<DropzoneInputProps, 'label' | 'className' | 'labelProps' | 'errorProps'>) => {
  const [previewUrl, setPreviewUrl] = useState(defaultPreview ?? null);

  useEffect(() => {
    if (!field.value) {
      return;
    }

    const url = URL.createObjectURL(field.value);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [defaultPreview, field.value]);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[], e: DropEvent) => {
      await setFieldValue(field.name, multiple ? acceptedFiles : acceptedFiles[0]);
      dropzoneOptions.onDrop?.(acceptedFiles, fileRejections, e);
    },
    [dropzoneOptions, field.name, multiple, setFieldValue],
  );
  const dropzoneState = useDropzone({ ...dropzoneOptions, onDrop, multiple });

  return { ...dropzoneState, previewUrl };
};

export default useDropzoneInput;
