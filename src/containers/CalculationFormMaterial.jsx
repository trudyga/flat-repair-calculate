import React from "react";
import PropTypes from "prop-types";
import useFetch from "react-fetch-hook";
import styled from "styled-components";

import { CircularProgress, Checkbox } from "@material-ui/core";
import MaterialView from "components/MaterialView";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const MaterialRow = styled.div`
  display: flex;
  align-items: center;
`;
const CheckboxContainer = styled.div`
  margin-right: 12px;
`;
const MaterialViewContainer = styled.div`
  flex: 1;
  border-left: ${props => (props.selected ? "3px solid #FCD016" : "gray")};
  padding-left: ${props => (props.selected ? "9px" : "12px")};
  margin-top: 12px;
  margin-bottom: 12px;
  margin-right: 12px;
`;

const WallsSchema = Yup.object().shape({
  ID: Yup.string().isRequired
});

const TYPES = {
  walls: "http://rayn934-001-site1.ctempurl.com/flat/room/walls",
  floors: "http://rayn934-001-site1.ctempurl.com/flat/room/floors",
  doors: "http://rayn934-001-site1.ctempurl.com/flat/room/doors",
  baseboards: "http://rayn934-001-site1.ctempurl.com/flat/room/baseboards",
  powersockets: "http://rayn934-001-site1.ctempurl.com/flat/room/powersockets",
  kitchens: "http://rayn934-001-site1.ctempurl.com/flat/kitchens",
  bathrooms: "http://rayn934-001-site1.ctempurl.com/flat/bathrooms"
};

const CalculationFormWalls = ({
  initialID,
  onSubmit: onFormSubmit,
  type,
  onGoBack
}) => {
  const requestUrl = TYPES[type];
  const { isLoading, data } = useFetch(requestUrl, {
    formatter: response => response.json()
  });

  const walls = data;

  return (
    <div>
      <Formik
        initialValues={{ ID: initialID || undefined }}
        validationSchema={WallsSchema}
        onSubmit={values => {
          const materialData = walls.find(({ id }) => values.ID === id);
          console.log("materialData", materialData);
          onFormSubmit(values.ID, materialData);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            {isLoading === false && walls && (
              <>
                <Field name="ID">
                  {({ field, form, meta }) => (
                    <div>
                      {walls.map(wall => (
                        <MaterialRow key={wall.id}>
                          <CheckboxContainer>
                            <Checkbox
                              checked={field.value === wall.id}
                              onClick={() =>
                                setFieldValue(
                                  "ID",
                                  field.value === wall.id ? undefined : wall.id
                                )
                              }
                            />
                          </CheckboxContainer>

                          <MaterialViewContainer
                            selected={field.value === wall.id}
                            onClick={() =>
                              setFieldValue(
                                "ID",
                                field.value === wall.id ? undefined : wall.id
                              )
                            }
                          >
                            <MaterialView
                              id={wall.id.toString()}
                              name={wall.name}
                              cost={+wall.cost}
                              description={wall.description}
                              colorList={wall.colorList}
                            />
                          </MaterialViewContainer>
                        </MaterialRow>
                      ))}
                    </div>
                  )}
                </Field>

                <div>
                  <button type="button" onClick={onGoBack}>
                    Назад
                  </button>
                  <button
                    disabled={Object.values(errors).length > 0}
                    type="submit"
                  >
                    Продовжити
                  </button>
                </div>
              </>
            )}

            {isLoading === true && <CircularProgress />}
          </Form>
        )}
      </Formik>
    </div>
  );
};

CalculationFormWalls.propTypes = {
  initialID: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.keys(TYPES))
};

export default CalculationFormWalls;
