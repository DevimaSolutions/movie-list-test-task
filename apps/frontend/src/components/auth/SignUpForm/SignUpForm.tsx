import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import PasswordInput from 'src/components/inputs/PasswordInput';
import TextInput from 'src/components/inputs/TextInput';

import { signUpSchema } from './schema';

import type { SignUpFormProps } from './types';

const initialValues = {
  email: '',
  password: '',
};

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={false}
      validationSchema={toFormikValidationSchema(signUpSchema)}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-1">
          <Field component={TextInput} name="email" placeholder="Email" type="email" />
          <Field component={PasswordInput} name="password" placeholder="Password" />
          <button
            className="flex w-full justify-center btn btn-primary"
            disabled={isSubmitting}
            type="submit"
          >
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
}
