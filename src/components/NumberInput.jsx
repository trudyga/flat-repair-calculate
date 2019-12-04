import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Field, ErrorMessage, useFormikContext } from "formik";

import { ReactComponent as MinusIcon } from "./icons/minusIcon.svg";
import { ReactComponent as PlusIcon } from "./icons/plusIcon.svg";

const InlineContainer = styled.div`
  display: flex;

  padding: 5px 20px;
  margin-bottom: 20px;
  height: 37px;
  background: #e7e7e7;
  align-items: center;
  border-radius: 4px 4px 0px 0px;
  border-bottom: 1px solid #898989;
`;

const Button = styled.button`
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  outline: none;
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 200px;
  padding: 0;
  margin: 0;
  outline: 0;
  border: 0;
  background: transparent;
  font-size: 18px;
  text-align: center;
`;

const Label = styled.label`
  width: 150px;
`;

const NumberInput = ({
  labelText,
  unitText,
  fieldName,
  withButtons,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();

  function decrement(field) {
    if (field.value <= 0) {
      return;
    }

    setFieldValue(field.name, field.value - 1);
  }

  return (
    <Field name={fieldName}>
      {({ field, form, meta }) => (
        <React.Fragment>
          <InlineContainer>
            <Label htmlFor={fieldName}>{labelText}</Label>

            <InputContainer>
              {withButtons && (
                <Button type="button" onClick={() => decrement(field)}>
                  <MinusIcon />
                </Button>
              )}
              <Input
                name={fieldName}
                {...field}
                type="number"
                placeholder="Введіть..."
                {...props}
              />
              {withButtons && (
                <Button
                  type="button"
                  onClick={() => setFieldValue(field.name, field.value + 1)}
                >
                  <PlusIcon />
                </Button>
              )}
            </InputContainer>

            {unitText && <span>{unitText}</span>}
          </InlineContainer>

          <ErrorMessage name={fieldName} />
        </React.Fragment>
      )}
    </Field>
  );
};

NumberInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  unitText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  withButtons: PropTypes.bool
};
NumberInput.defaultProps = {
  unitText: undefined,
  withButtons: false
};

export default NumberInput;
