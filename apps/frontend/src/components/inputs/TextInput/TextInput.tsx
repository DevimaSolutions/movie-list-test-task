import clsx from 'clsx';
import React from 'react';

import type { TextInputProps } from './types';

export function TextInput({
  field,
  form: { touched, errors },
  label,
  type = 'text',
  className,
  rootClassName,
  labelProps,
  errorProps,
  ...props
}: TextInputProps) {
  const hasError = touched[field.name] && errors[field.name];

  return (
    <div className={rootClassName}>
      {label ? (
        <label {...labelProps} className={clsx('label p-0', labelProps?.className)}>
          {label}
        </label>
      ) : null}
      <input
        type={type}
        {...field}
        {...props}
        className={clsx('input input-bordered  w-full mt-2', className, {
          'input-error': hasError,
        })}
      />
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

export default TextInput;
