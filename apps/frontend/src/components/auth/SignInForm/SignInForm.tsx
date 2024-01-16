'use client';

import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import CheckboxInput from 'src/components/inputs/CheckboxInput';
import PasswordInput from 'src/components/inputs/PasswordInput';
import TextInput from 'src/components/inputs/TextInput';

import { signInSchema } from './schema';

import type { SignInFormProps } from './types';

const initialValues = {
  email: '',
  password: '',
};

export function SignInForm({ onSubmit }: SignInFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(signInSchema)}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-1">
          <Field component={TextInput} name="email" placeholder="Email" type="email" />
          <Field component={PasswordInput} name="password" placeholder="Password" />
          <Field
            component={CheckboxInput}
            label="Remember me"
            labelProps={{ className: 'justify-center' }}
            name="remember"
          />
          <button
            className="flex w-full justify-center btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}
