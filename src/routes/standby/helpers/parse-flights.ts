import { filter, find, reject } from "lodash";
import pluralize from "pluralize";
import { Flight, Query } from "types/types";
import {
  formatFlight,
  getDestinationName,
  pluralizeNumberOfFlights,
} from "./helpers";
import moment = require("moment");

export const parseFlights = (flights: Flight[], query: Query) => {
  const { code, role, base, day } = query;

  const date = day === "today" ? moment() : moment().add(1, "day");

  const flightsFromBase = filter(flights, { dep: base });

  const flightsOperatedByTransavia = reject(flightsFromBase, {
    acversion: "738HMIA",
  });

  const flightsOnDate = filter(flightsOperatedByTransavia, (flight: Flight) =>
    moment(flight.start).isSame(date, "day")
  );

  const numberOfDepartingFlights = filter(flightsOnDate, (flight: Flight) =>
    moment(flight.start).isAfter()
  ).length;

  const ownFlights = filter(flightsOnDate, { crew: [{ code }] });

  const openFlights = filter(
    flightsOnDate,
    (flight: Flight) => !find(flight.crew, { role })
  ) as Flight[];

  switch (ownFlights.length) {
    case 0:
      return parseOpenFlights(openFlights, query, numberOfDepartingFlights);
    case 1:
      return parseOwnSingleFlight(ownFlights, role);
    case 2:
      return parseOwnDoubleFlight(ownFlights, role);
  }
};

const parseOwnSingleFlight = (flights, role) => {
  return `You are on the ${formatFlight(flights[0], role)}`;
};

const parseOwnDoubleFlight = (flights, role) => {
  return (
    `Fuck your life, you are on the ` +
    `${getDestinationName(flights[0].dest)} ` +
    `${getDestinationName(flights[1].dest)}. ` +
    `${formatFlight(flights[0], role)}\n` +
    `${formatFlight(flights[1], role)}`
  );
};

const parseOpenFlights = (
  flights: Flight[],
  query: Query,
  numberOfDepartingFlights: number
) => {
  const { role, base, day } = query;

  const baseName = getDestinationName(base);

  const departingFlights =
    numberOfDepartingFlights === 0
      ? "no more flights"
      : pluralize(
          `${day === "today" ? "more" : ""} flights`,
          numberOfDepartingFlights,
          true
        );

  return (
    `${pluralizeNumberOfFlights(flights.length)} at ` +
    `${baseName} ${day}. \n` +
    `${flights.map((flight) => formatFlight(flight, role)).join(" ")}\n` +
    `There ${
      numberOfDepartingFlights === 1 ? "is" : "are"
    } ${departingFlights} departing from ${baseName} ${day}.`
  );
};
