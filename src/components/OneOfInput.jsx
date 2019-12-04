import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Field, ErrorMessage, useFormikContext } from "formik";

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

const Label = styled.label`
  width: 150px;
`;

const Button = styled.button`
  padding: 5px 7px;
  margin: 0;
  border: 0;
  border-radius: 20px;
  background: transparent;
  outline: none;
`;

const Options = styled.div`
  display: flex;
`;

const Option = styled(Button)`
  background: ${props => (props.selected ? "#fcd016" : "#FFFFFF;")};
  border-radius: 20px;
  margin-right: 10px;
`;

const NumberInput = ({ labelText, fieldName, options, ...props }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <Field name={fieldName}>
      {({ field, form, meta }) => (
        <React.Fragment>
          <InlineContainer>
            <Label htmlFor={fieldName}>{labelText}</Label>

            <InputContainer>
              <Options>
                {options.map(({ value, name }) => (
                  <Option
                    key={value}
                    selected={value === field.value}
                    onClick={() => setFieldValue(field.name, value)}
                  >
                    {name}
                  </Option>
                ))}
              </Options>
            </InputContainer>
          </InlineContainer>

          <ErrorMessage name={fieldName} />
        </React.Fragment>
      )}
    </Field>
  );
};

NumberInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default NumberInput;
