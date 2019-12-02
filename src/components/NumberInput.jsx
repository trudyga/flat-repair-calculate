import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Field, useFormikContext } from "formik";

import { ReactComponent as MinusIcon } from "./icons/minusIcon.svg";
import { ReactComponent as PlusIcon } from "./icons/plusIcon.svg";

const InlineContainer = styled.div`
  display: flex;
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
            <label htmlFor={fieldName}>{labelText}</label>
            {withButtons && (
              <button type="button" onClick={() => decrement(field)}>
                <MinusIcon />
              </button>
            )}

            <div>
              <input
                name={fieldName}
                {...field}
                type="number"
                placeholder="Введіть..."
                {...props}
              />
            </div>
            {withButtons && (
              <button
                type="button"
                onClick={() => setFieldValue(field.name, field.value + 1)}
              >
                <PlusIcon />
              </button>
            )}

            {unitText && <span>{unitText}</span>}
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
  unitText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  withButtons: PropTypes.bool
};
NumberInput.defaultProps = {
  unitText: undefined,
  withButtons: false
};

export default NumberInput;
