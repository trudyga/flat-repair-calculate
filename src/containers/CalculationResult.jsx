import React, { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import PropTypes from "prop-types";

import { CircularProgress } from "@material-ui/core";

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
    const requestUrl = "http://rayn934-001-site1.ctempurl.com/flat/initialize";
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
      <div>
        <span>Загальна вартість</span>
        <span>{Math.round(Cost)} грн</span>
      </div>
      <div>
        <span>Вартість за м2</span>
        <span>{Math.round(Cost / area)} грн</span>
      </div>

      <div>
        <button type="button" onClick={onClose}>
          Завершити
        </button>
      </div>
    </div>
  );
};

CalculationResult.propTypes = {
  values: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CalculationResult;
