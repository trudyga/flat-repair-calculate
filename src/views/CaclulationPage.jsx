import React, { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import styled from "styled-components";

import { Redirect } from "react-router-dom";

import CalculationFormGeneral from "containers/CalculationFormGeneral";
import CalculationFormMaterial from "containers/CalculationFormMaterial";
import CalculationResult from "containers/CalculationResult";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return [
    "Загальні дані",
    "Стіни",
    "Підлога",
    "Двері",
    "Плинтус",
    "Розетки",
    "Кухня",
    "Ванна кімната",
    "Результат"
  ];
}

function getStepContent(stepIndex, values, onFill, onBack, onFinish) {
  switch (stepIndex) {
    case 0:
      return (
        <CalculationFormGeneral
          key="general"
          initials={values}
          onSubmit={({ area, rooms, doors, ceilHeight }) =>
            onFill({ area, rooms, doors, ceilHeight })
          }
        />
      );
    case 1:
      return (
        <CalculationFormMaterial
          key="wallsID"
          initialID={values.wallsID}
          onSubmit={(id, m) => onFill({ wallsID: id }, { type: "walls", ...m })}
          onGoBack={onBack}
          type="walls"
        />
      );
    case 2:
      return (
        <CalculationFormMaterial
          key="floorsID"
          initialID={values.floorsID}
          onSubmit={(id, m) =>
            onFill({ floorsID: id }, { type: "floors", ...m })
          }
          onGoBack={onBack}
          type="floors"
        />
      );
    case 3:
      return (
        <CalculationFormMaterial
          key="doorsID"
          initialID={values.doorsID}
          onSubmit={(id, m) => onFill({ doorsID: id }, { type: "doors", ...m })}
          onGoBack={onBack}
          type="doors"
        />
      );
    case 4:
      return (
        <CalculationFormMaterial
          key="baseboardsID"
          initialID={values.baseboardsID}
          onSubmit={(id, m) =>
            onFill({ baseboardsID: id }, { type: "baseboards", ...m })
          }
          onGoBack={onBack}
          type="baseboards"
        />
      );
    case 5:
      return (
        <CalculationFormMaterial
          key="powersocketsID"
          initialID={values.powersocketsID}
          onSubmit={(id, m) =>
            onFill({ powersocketsID: id }, { type: "powersockets", ...m })
          }
          onGoBack={onBack}
          type="powersockets"
        />
      );
    case 6:
      return (
        <CalculationFormMaterial
          key="kitchensID"
          initialID={values.kitchensID}
          onSubmit={(id, m) =>
            onFill({ kitchensID: id }, { type: "kitchens", ...m })
          }
          onGoBack={onBack}
          type="kitchens"
        />
      );
    case 7:
      return (
        <CalculationFormMaterial
          key="bathroomsID"
          initialID={values.bathroomsID}
          onSubmit={(id, m) =>
            onFill({ bathroomsID: id }, { type: "bathrooms", ...m })
          }
          onGoBack={onBack}
          type="bathrooms"
        />
      );
    case 8:
      return <CalculationResult values={values} onClose={onFinish} />;
    default:
      return "Unknown stepIndex";
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [redirectAccountPage, setRedirectAccountPage] = useState(false);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  function onFill(data, materialData) {
    unstable_batchedUpdates(() => {
      if (materialData !== undefined) {
        const newSelectedMaterials = selectedMaterials
          .filter(m => m.type !== materialData.type)
          .concat([materialData]);
        setSelectedMaterials(newSelectedMaterials);
      }

      setSelectedValues({ ...selectedValues, ...data });
      handleNext();
    });
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleFinish = () => setRedirectAccountPage(true);

  if (redirectAccountPage) {
    return <Redirect to="/my-account" />;
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container>
        <div style={{ padding: "24px" }}>
          <div>
            {getStepContent(
              activeStep,
              selectedValues,
              onFill,
              handleBack,
              handleFinish
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
