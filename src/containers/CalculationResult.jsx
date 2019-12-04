import React, { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import PropTypes from "prop-types";

import styled from "styled-components";

import { CircularProgress } from "@material-ui/core";

import ActionButton from "components/ActionButton";

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;
const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;
const Label = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  display: flex;
  align-items: center;

  color: #000000;

  margin-right: 1em;
`;

const Value = styled.span`
  display: inline-block;
  background: #fcd016;
  border-radius: 20px;

  padding: 10px 20px;
`;

function mapValuesToRequestObj({
  area,
  rooms,
  doors,
  ceilHeight,
  wallsID,
  floorsID,
  doorsID,
  baseboardsID,
  powersocketsID,
  kitchensID,
  bathroomsID
}) {
  const username = localStorage.getItem("username");

  return {
    login: username,
    square: area,
    roomNumber: rooms,
    doorNumber: doors,
    height: ceilHeight,
    address: "test address",
    rooms: {
      id: 0,
      wallsID,
      doorsID,
      floorID: floorsID,
      baseboardID: baseboardsID,
      powerSocketsID: powersocketsID
    },
    bathroomID: bathroomsID,
    kitchenID: kitchensID,
    additionalsID: []
  };
}

const CalculationResult = ({ values, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const requestUrl =
      "https://cors-anywhere.herokuapp.com/http://rayn934-001-site1.ctempurl.com/flat/initialize";
    const requestBody = mapValuesToRequestObj(values);

    fetch(requestUrl, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.text())
      .then(text => JSON.parse(text))
      .then(d => {
        unstable_batchedUpdates(() => {
          setData(d);
          setIsLoading(false);
        });
      })
      .catch(err => {
        console.error(err);
        unstable_batchedUpdates(() => {
          setData(null);
          setIsLoading(false);
        });
        throw err;
      });
  }, [values]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <h1>Щось пішло не так</h1>;
  }

  const { area } = values;
  const { FlatID, Cost } = data;
  console.log("area", "cost", area, Cost);
  return (
    <div>
      <Row>
        <Label>Загальна вартість</Label>
        <Value>{Math.round(Cost)} грн</Value>
      </Row>
      <Row>
        <Label>Вартість за м2</Label>
        <Value>{Math.round(Cost / area)} грн</Value>
      </Row>

      <ButtonsRow>
        <ActionButton color="primary" type="button" onClick={onClose}>
          Завершити
        </ActionButton>
      </ButtonsRow>
    </div>
  );
};

CalculationResult.propTypes = {
  values: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CalculationResult;
