import React from "react";
import PropTypes from "prop-types";

import TextInput from "components/TextInput";

import { Formik, Form } from "formik";

const CaclulationPage = props => {
  return (
    <div>
      <div>Calculation Page</div>
      <div>
        <Formik
          initialValues={{ area: 0 }}
          onSubmit={(values, actions) => {
            console.log("values", values);
          }}
        >
          {props => (
            <Form>
              <TextInput
                fieldName="area"
                labelText="Площа квартири"
                unitText={
                  <span>
                    м<sup>2</sup>
                  </span>
                }
              />
            </Form>
          )}
        </Formik>
        />
      </div>
    </div>
  );
  return <div>Calculation Page</div>;
};

CaclulationPage.propTypes = {};

export default CaclulationPage;
