import React from "react";
import PropTypes from "prop-types";

import TextInput from "components/TextInput";

import { Formik, Form } from "formik";
import * as Yup from "yup";

function equalTo(ref: any, msg: any) {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path
    },
    test: function(value: any) {
      return value === this.resolve(ref);
    }
  });
}
Yup.addMethod(Yup.string, "equalTo", equalTo);

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .email()
    .required(),
  fullname: Yup.string()
    .trim()
    .min(5)
    .max(100)
    .required(),
  password: Yup.string()
    .trim()
    .min(5)
    .max(30)
    .required(),
  passwordRepeat: Yup.string()
    .equalTo(Yup.ref("password"), "Passwords must match")
    .required("Required")
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
          fullname: "",
          username: "",
          password: "",
          passwordRepeat: ""
        }}
        validationSchema={RegisterSchema}
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
            <TextInput fieldName="fullname" labelText="Повне Ім’я" />
            <TextInput
              fieldName="password"
              labelText="Пароль"
              type="password"
            />
            <TextInput
              fieldName="passwordRepeat"
              labelText="Повторіть пароль"
              type="password"
            />
            <button
              disabled={hasErrors(errors, initialErrors, touched)}
              type="submit"
            >
              Зареєструватись
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
