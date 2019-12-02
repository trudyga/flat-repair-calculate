import React from "react";
import PropTypes from "prop-types";
import useFetch from "react-fetch-hook";

import { CircularProgress } from "@material-ui/core";
import MaterialView from "components/MaterialView";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const WallsSchema = Yup.object().shape({
  wallID: Yup.string().isRequired
});

const CalculationFormWalls = ({ onSubmit: onFormSubmit }) => {
  const { isLoading, data } = useFetch(
    "http://rayn934-001-site1.ctempurl.com/flat/room/walls",
    {
      formatter: response => response.json()
    }
  );

  const walls = data;
  console.log("isLoading", isLoading);
  console.log("walls", walls);

  return (
    <div>
      <Formik
        initialValues={{ wallID: undefined }}
        validationSchema={WallsSchema}
        onSubmit={(values, actions) => {
          console.log("values", values);
          onFormSubmit(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            {isLoading === false && walls && (
              <>
                <Field name="wallID">
                  {({ field, form, meta }) => (
                    <div>
                      {walls.map(wall => (
                        <div onClick={() => setFieldValue(wall.id)}>
                          <MaterialView
                            id={wall.id}
                            name={wall.name}
                            cost={wall.cost}
                            description={wall.description}
                            colorList={wall.colorList}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </Field>

                <button
                  disabled={Object.values(errors).length > 0}
                  type="submit"
                >
                  Переглянути результат
                </button>
              </>
            )}

            {isLoading === true && <CircularProgress />}
          </Form>
        )}
      </Formik>
    </div>
  );
};

CalculationFormWalls.propTypes = {};

export default CalculationFormWalls;
