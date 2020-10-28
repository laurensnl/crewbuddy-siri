import { filter, find, reject } from "lodash";
import pluralize from "pluralize";
import {
  formatFlight,
  getDestinationName,
  pluralizeNumberOfFlights,
} from "./helpers";
import moment = require("moment");

interface Flight {
  dep: string;
  arr: string;
  std: string;
  crew: string[];
}

interface Query {
  code: string;
  role: "FOJ" | "FC";
  base: "RTM" | "AMS" | "EIN";
  day: "today" | "tomorrow";
}

export const parseFlights = (flights: Flight[], query: Query) => {
  const { code, role, base, day } = query;

  const date = day === "today" ? moment() : moment().add(1, "day");

  const flightsFromBase = filter(flights, { dep: base });

  const flightsOperatedByTransavia = reject(flightsFromBase, {
    acversion: "738HMIA",
  });

  const flightsOnDate = filter(flightsOperatedByTransavia, (flight: Flight) =>
    moment(flight.std, "YYYY-MM-D hh:mm").isSame(date, "day")
  );

  const numberOfDepartingFlights = filter(flightsOnDate, (flight: Flight) =>
    moment(flight.std, "YYYY-MM-D hh:mm").isAfter()
  ).length;

  const ownFlights = filter(flightsOnDate, { crew: [{ code }] });

  const openFlights = filter(
    flightsOnDate,
    (flight: Flight) => !find(flight.crew, { type: role })
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
    `${getDestinationName(flights[0].arr)} ` +
    `${getDestinationName(flights[1].arr)}. ` +
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
    `${baseName} ${day}.\n` +
    `${flights.map((flight) => formatFlight(flight, role))}\n` +
    `There ${
      numberOfDepartingFlights === 1 ? "is" : "are"
    } ${departingFlights} departing from ${baseName} ${day}`
  );
};
