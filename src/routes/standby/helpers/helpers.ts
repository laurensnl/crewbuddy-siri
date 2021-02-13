import { find } from "lodash";
import moment from "moment";
import { CrewMember, Flight, Query, Role } from "types/types";
const airports = require("airport-codes");

interface isValid {
  valid?: boolean;
  error?: string;
}

export function isValidQuery(query: Query): isValid {
  const { code, role, base, day } = query;

  if (!code) return { error: 'Missing crew code (add code: "XXX" to query)' };
  if (!role) return { error: 'Missing role (add role: "FOJ" | "FC" to query)' };
  if (role !== "FOJ" && role !== "FC")
    return { error: 'Invalid role. Please use "FOJ" or "FC"' };
  if (!base)
    return { error: 'Missing base (add base: "RTM" | "AMS" | "EIN" to query)' };
  if (!day)
    return { error: 'Missing day (add day: "today" | "tomorrow" to query)' };

  return { valid: true };
}

export function pluralizeNumberOfFlights(numberOfOpenFlights: number) {
  switch (numberOfOpenFlights) {
    case 0:
      return `There are no open flights`;
    case 1:
      return `There is 1 open flight`;
    default:
      return `There are ${numberOfOpenFlights} open flights`;
  }
}

export function formatFlight(flight: Flight, role: Role) {
  const { dest, start } = flight;
  const otherCrewMember = getOtherCrewMemberName(flight, role);
  const otherRole = getRoleName(getOtherRole(role));

  return `${getDestinationName(dest)}, departing at ${formatTime(
    start
  )} local with ${
    otherCrewMember ? otherCrewMember : `an unknown ${otherRole}`
  }.`;
}

export function getOtherRole(role: Role) {
  return role === "FOJ" ? "FC" : "FOJ";
}

export function getRoleName(role) {
  return role === "FOJ" ? "First Officer" : "captain";
}

export function getOtherCrewMemberName(flight: Flight, role: Role) {
  const otherRole = getOtherRole(role);
  return getCrewMemberName(flight, otherRole);
}

export function getCrewMemberName(flight: Flight, role: Role) {
  const crewMember = find(flight.crew, { role }) as CrewMember;
  return formatName(crewMember);
}

export function formatName(crewMember: CrewMember) {
  const { first_name, last_name, code } = crewMember;
  return code ? `${first_name} ${last_name}` : undefined;
}

export function formatTime(date) {
  return moment.utc(date).local().format("HH:mm");
}

export function getDestinationName(dest) {
  if (!dest) return null;
  return airports.findWhere({ iata: dest }).get("name");
}
