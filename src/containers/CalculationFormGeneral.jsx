import React from "react";
import PropTypes from "prop-types";

import TextInput from "components/TextInput";
import NumberInput from "components/NumberInput";
import OneOfInput from "components/OneOfInput";

import ActionButton from "components/ActionButton";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import styled from "styled-components";

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

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: center;

  :not(:last-child) {
    margin-right: 10px;
  }
`;

const CalculationFormGeneral = ({ initials, onSubmit: onFormSubmit }) => {
  return (
    <div>
      <Formik
        initialValues={{
          area: 10,
          rooms: 1,
          doors: 2,
          ceilHeight: 1,
          address: "",
          ...initials
        }}
        validationSchema={GeneralSchema}
        onSubmit={(values, actions) => {
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

            <ButtonsBlock>
              <ActionButton
                color="primary"
                disabled={Object.values(errors).length > 0}
                type="submit"
              >
                Продовжити
              </ActionButton>
            </ButtonsBlock>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CalculationFormGeneral.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initials: PropTypes.object.isRequired
};

export default CalculationFormGeneral;
