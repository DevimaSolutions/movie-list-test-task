import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import useDropzoneInput from './useDropzoneInput';

import type { DropzoneInputProps } from './types';

export function DropzoneInput({
  field,
  form: { touched, errors, ...form },
  defaultPreview,
  multiple,
  label,
  className,
  rootClassName,
  labelProps,
  errorProps,
  ...props
}: DropzoneInputProps) {
  const hasError = (form.submitCount > 0 || touched[field.name]) && errors[field.name];
  const { getRootProps, getInputProps, isDragAccept, isDragReject, previewUrl } = useDropzoneInput({
    defaultPreview,
    field,
    form: { touched, errors, ...form },
    multiple,
    ...props,
  });

  return (
    <div className={rootClassName}>
      {label ? (
        <label {...labelProps} className={clsx('label p-0', labelProps?.className)}>
          {label}
        </label>
      ) : null}
      <div
        {...getRootProps({
          className: clsx(
            'bg-stale-700 rounded-lg aspect-square border-dashed border-2 border-white bg-contain bg-no-repeat bg-center',
            className,
            { 'border-primary bg-stale-900': isDragAccept },
            { 'border-error bg-stale-900': isDragReject },
          ),
          style: { backgroundImage: previewUrl ? `url('${previewUrl}')` : undefined },
        })}
      >
        <input {...getInputProps()} />
        <div className="backdrop-brightness-50 w-full h-full flex flex-col gap-2 items-center justify-center">
          <ArrowDownTrayIcon className="w-4 h-4" />
          <p className="m-0">{defaultPreview ? 'Drop other image here' : 'Upload an image here'}</p>
        </div>
      </div>
      <label
        {...errorProps}
        className={clsx(
          'label label-text text-error p-0 min-h-[24px] h-full pt-1',
          errorProps?.className,
        )}
      >
        {hasError ? errors[field.name] : null}
      </label>
    </div>
  );
}

export default DropzoneInput;
