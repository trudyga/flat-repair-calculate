import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ErrorMessage, Field } from "formik";

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

const TextInput = ({ labelText, unitText, fieldName, type, ...props }) => {
  return (
    <Field name={fieldName}>
      {({ field, form, meta }) => (
        <React.Fragment>
          <InlineContainer>
            <Label htmlFor={fieldName}>{labelText}</Label>
            <InputContainer>
              <Input
                name={fieldName}
                {...field}
                type={type}
                autoComplete={type === "password" ? "new-password" : "off"}
                placeholder="Введіть..."
                {...props}
              />
            </InputContainer>
            {unitText && <span>{unitText}</span>}
          </InlineContainer>

          <ErrorMessage name={fieldName} />
        </React.Fragment>
      )}
    </Field>
  );
};

TextInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  unitText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  type: PropTypes.string
};
TextInput.defaultProps = {
  unitText: undefined,
  type: "text"
};

export default TextInput;
