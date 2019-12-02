import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Field, useFormikContext } from "formik";

const InlineContainer = styled.div`
  display: flex;
`;

const Options = styled.div`
  display: flex;
`;

const Option = styled.button`
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
            <label htmlFor={fieldName}>{labelText}</label>

            <div>
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
            </div>
          </InlineContainer>

          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
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
