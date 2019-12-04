import React from "react";
import PropTypes from "prop-types";

import TextInput from "components/TextInput";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const AuthSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .email()
    .required(),
  password: Yup.string()
    .trim()
    .min(5)
    .max(30)
    .required()
});

const Register = ({ onSubmit }) => {
  const hasErrors = (errors, initialErrors, touched) => {
    if (Object.values(touched) === 0) {
      return Object.values(initialErrors || {}).length > 0;
    }

    return Object.values(errors).length > 0;
  };
  return (
    <div>
      <Formik
        initialValues={{
          username: ""
        }}
        validationSchema={AuthSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
        }}
      >
        {({ errors, initialErrors, touched }) => (
          <Form>
            <TextInput
              fieldName="username"
              type="email"
              labelText="Електронна пошта"
            />
            <TextInput
              fieldName="password"
              labelText="Пароль"
              type="password"
            />
            <button
              disabled={hasErrors(errors, initialErrors, touched)}
              type="submit"
            >
              Увійти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Register;
