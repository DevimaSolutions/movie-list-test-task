import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React, { useState } from 'react';

import type { PasswordInputProps } from './types';

export function PasswordInput({
  field,
  form: { touched, errors },
  label,
  className,
  labelProps,
  errorProps,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const hasError = touched[field.name] && errors[field.name];

  return (
    <div>
      {label ? (
        <label {...labelProps} className={clsx('label p-0', labelProps?.className)}>
          {label}
        </label>
      ) : null}
      <div className="relative border-green w-full mt-2">
        <input
          type={showPassword ? 'text' : 'password'}
          {...field}
          {...props}
          className={clsx('input input-bordered w-full pr-11', className, {
            'input-error': hasError,
          })}
        />
        {showPassword ? (
          <EyeIcon
            className="absolute top-3 right-5 w-6 h-6 hover:cursor-pointer"
            onClick={toggleShowPassword}
          />
        ) : (
          <EyeSlashIcon
            className="absolute top-3 right-5 w-6 h-6 hover:cursor-pointer"
            onClick={toggleShowPassword}
          />
        )}
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

export default PasswordInput;
