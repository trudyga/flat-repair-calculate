import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Field } from "formik";

const InlineContainer = styled.div`
  display: flex;
`;

const TextInput = ({ labelText, unitText, fieldName, ...props }) => {
  return (
    <Field name={fieldName}>
      {({ field, form, meta }) => (
        <React.Fragment>
          <InlineContainer>
            <label htmlFor={fieldName}>{labelText}</label>
            <div>
              <input
                name={fieldName}
                {...field}
                type="text"
                placeholder="Введіть..."
                {...props}
              />
            </div>
            <span>{unitText}</span>
          </InlineContainer>

          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </React.Fragment>
      )}
    </Field>
  );
};

TextInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  unitText: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired
};

export default TextInput;
