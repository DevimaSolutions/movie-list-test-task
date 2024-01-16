import type { FieldProps } from 'formik';
import type { LabelHTMLAttributes } from 'react';
import type { DropzoneOptions } from 'react-dropzone';

export interface DropzoneInputProps<
  V = File | undefined,
  FormValues extends Record<string, unknown> = Record<string, unknown>,
> extends FieldProps<V, FormValues>,
    DropzoneOptions {
  defaultPreview?: string;
  className?: string;
  rootClassName?: string;
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  errorProps?: LabelHTMLAttributes<HTMLLabelElement>;
}
