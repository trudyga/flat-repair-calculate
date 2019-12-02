import React from "react";
import PropTypes from "prop-types";

import TextInput from "components/TextInput";
import NumberInput from "components/NumberInput";
import OneOfInput from "components/OneOfInput";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const GeneralSchema = Yup.object().shape({
  area: Yup.number()
    .min(1)
    .max(1500)
    .integer()
    .truncate()
    .required(),
  rooms: Yup.number()
    .min(1)
    .max(40)
    .integer()
    .truncate()
    .required(),
  doors: Yup.number()
    .min(1)
    .max(80)
    .integer()
    .truncate()
    .required(),
  ceilHeight: Yup.mixed()
    .oneOf([1, 2])
    .required(),
  address: Yup.string()
    .min(1)
    .max(200)
    .trim()
    .required()
});

const CalculationFormGeneral = ({ onSubmit: onFormSubmit }) => {
  return (
    <div>
      <Formik
        initialValues={{ area: 10, rooms: 1, doors: 2, ceilHeight: 1 }}
        validationSchema={GeneralSchema}
        onSubmit={(values, actions) => {
          console.log("values", values);
          onFormSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <NumberInput
              fieldName="area"
              labelText="Площа квартири"
              unitText={
                <span>
                  м<sup>2</sup>
                </span>
              }
            />
            <NumberInput
              fieldName="rooms"
              labelText="Кількість кімнат"
              withButtons
            />
            <NumberInput
              fieldName="doors"
              labelText="Кількість дверей"
              withButtons
            />
            <OneOfInput
              fieldName="ceilHeight"
              labelText="Висота стелі"
              options={[
                { value: 1, name: "до 3 м" },
                { value: 2, name: "більше 3м" }
              ]}
            />
            <TextInput fieldName="address" labelText="Адреса будинку" />
            <button disabled={Object.values(errors).length > 0} type="submit">
              Переглянути результат
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CalculationFormGeneral.propTypes = {};

export default CalculationFormGeneral;
